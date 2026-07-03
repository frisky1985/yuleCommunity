/**
 * 书签/收藏 API 路由 (PostgreSQL 版)
 * GET    /api/user/bookmarks        — 获取收藏列表 (需登录)
 * POST   /api/user/bookmarks        — 添加收藏
 * DELETE /api/user/bookmarks/:id    — 删除收藏
 * POST   /api/user/bookmarks/toggle — 切换收藏
 * POST   /api/user/bookmarks/check  — 批量检查收藏状态
 */
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import pool, { parseTags } from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

// GET /api/user/bookmarks
router.get('/', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { collection, type, page = '1', limit = '20' } = req.query as Record<string, string>;

    const conditions: string[] = ['user_id = $1'];
    const params: any[] = [userId];

    if (collection) {
      params.push(collection);
      conditions.push(`collection = $${params.length}`);
    }
    if (type) {
      params.push(type);
      conditions.push(`content_type = $${params.length}`);
    }

    const where = conditions.join(' AND ');
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    // 总数
    const countResult = await pool.query(`SELECT COUNT(*) as total FROM bookmarks WHERE ${where}`, params);
    const total = parseInt(countResult.rows[0].total, 10);

    // 收藏夹列表
    const collectionsResult = await pool.query(
      'SELECT DISTINCT collection FROM bookmarks WHERE user_id = $1 ORDER BY collection',
      [userId]
    );
    const collections = collectionsResult.rows.map(r => r.collection);

    // 分页数据
    const dataResult = await pool.query(
      `SELECT * FROM bookmarks WHERE ${where} ORDER BY bookmarked_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limitNum, offset]
    );

    const data = dataResult.rows.map(r => ({
      bookmarkId: r.bookmark_id,
      userId: r.user_id,
      content: {
        type: r.content_type,
        contentId: r.content_id,
        title: r.title,
        slug: r.slug || undefined,
        description: r.description || undefined,
        category: r.category || undefined,
        tags: parseTags(r.tags),
        author: r.author_id ? {
          id: r.author_id,
          name: r.author_name,
          avatar: r.author_avatar || undefined,
        } : undefined,
        coverImage: r.cover_image || undefined,
        url: r.url || undefined,
      },
      collection: r.collection,
      note: r.note || undefined,
      bookmarkedAt: r.bookmarked_at,
      isPinned: r.is_pinned,
      sortOrder: r.sort_order,
    }));

    res.json({
      success: true,
      data,
      pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
      collections,
    });
  } catch (err) {
    console.error('[bookmarks list error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// POST /api/user/bookmarks
router.post('/', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { content, collection = '默认收藏', note } = req.body;

    if (!content?.type || !content?.contentId || !content?.title) {
      res.status(400).json({ success: false, message: '缺少必填字段 (content.type/contentId/title)' });
      return;
    }

    const bookmarkId = uuid();

    await pool.query(
      `INSERT INTO bookmarks (
        bookmark_id, user_id,
        content_type, content_id, title, slug, description, category, tags,
        author_id, author_name, author_avatar, cover_image, url,
        collection, note, bookmarked_at, sort_order
      ) VALUES (
        $1, $2,
        $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14,
        $15, $16, NOW(), $17
      ) ON CONFLICT (user_id, content_id) DO UPDATE SET
        collection = EXCLUDED.collection,
        note = EXCLUDED.note,
        bookmarked_at = NOW()`,
      [
        bookmarkId, userId,
        content.type, content.contentId, content.title,
        content.slug || '', content.description || '', content.category || '',
        JSON.stringify(content.tags || []),
        content.author?.id || '', content.author?.name || '', content.author?.avatar || '',
        content.coverImage || '', content.url || '',
        collection, note || '', Date.now(),
      ]
    );

    const bookmark = {
      bookmarkId,
      userId,
      content,
      collection,
      note: note || '',
      bookmarkedAt: new Date().toISOString(),
      isPinned: false,
      sortOrder: Date.now(),
    };

    res.status(201).json({ success: true, bookmark });
  } catch (err) {
    console.error('[bookmark create error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// POST /api/user/bookmarks/toggle
router.post('/toggle', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { content } = req.body;

    if (!content?.contentId) {
      res.status(400).json({ success: false, message: '缺少 contentId' });
      return;
    }

    const existing = await pool.query(
      'SELECT bookmark_id FROM bookmarks WHERE user_id = $1 AND content_id = $2 LIMIT 1',
      [userId, content.contentId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'DELETE FROM bookmarks WHERE user_id = $1 AND content_id = $2',
        [userId, content.contentId]
      );
      res.json({ success: true, action: 'removed' });
    } else {
      const bookmarkId = uuid();
      await pool.query(
        `INSERT INTO bookmarks (bookmark_id, user_id, content_type, content_id, title, slug, description, category, url, collection, bookmarked_at, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '默认收藏', NOW(), $10)`,
        [
          bookmarkId, userId,
          content.type || 'article', content.contentId,
          content.title || '', content.slug || '', content.description || '',
          content.category || '', content.url || '',
          Date.now(),
        ]
      );

      res.json({
        success: true,
        action: 'added',
        bookmark: {
          bookmarkId,
          userId,
          content: {
            type: content.type || 'article',
            contentId: content.contentId,
            title: content.title || '',
            slug: content.slug,
            description: content.description,
            category: content.category,
            url: content.url,
          },
          collection: '默认收藏',
          note: '',
          bookmarkedAt: new Date().toISOString(),
          isPinned: false,
          sortOrder: Date.now(),
        },
      });
    }
  } catch (err) {
    console.error('[bookmark toggle error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// POST /api/user/bookmarks/check
router.post('/check', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { contentIds } = req.body as { contentIds: string[] };

    if (!Array.isArray(contentIds) || contentIds.length === 0) {
      res.json({ success: true, bookmarkedIds: [] });
      return;
    }

    const placeholders = contentIds.map((_, i) => `$${i + 2}`).join(',');
    const result = await pool.query(
      `SELECT content_id FROM bookmarks WHERE user_id = $1 AND content_id IN (${placeholders})`,
      [userId, ...contentIds]
    );

    res.json({ success: true, bookmarkedIds: result.rows.map(r => r.content_id) });
  } catch (err) {
    console.error('[bookmark check error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// DELETE /api/user/bookmarks/:contentId
router.delete('/:contentId', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { contentId } = req.params;

    const result = await pool.query(
      'DELETE FROM bookmarks WHERE user_id = $1 AND content_id = $2 RETURNING bookmark_id',
      [userId, contentId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: '收藏未找到' });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('[bookmark delete error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

export default router;
