/**
 * 书签/收藏 API 路由
 * GET    /api/user/bookmarks        — 获取收藏列表 (需登录)
 * POST   /api/user/bookmarks        — 添加收藏
 * DELETE /api/user/bookmarks/:id    — 删除收藏
 * POST   /api/user/bookmarks/toggle — 切换收藏
 * POST   /api/user/bookmarks/check  — 批量检查收藏状态
 */
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { store } from '../services/storage.js';
import { requireAuth } from '../middleware/auth.js';
import type { Bookmark } from '../types/index.js';

const router = Router();

// 所有书签路由都需要登录
router.use(requireAuth);

// GET /api/user/bookmarks
router.get('/', (req, res) => {
  const userId = req.user!.userId;
  const data = store.get();
  const { collection, type, page = '1', limit = '20' } = req.query as Record<string, string>;

  let bookmarks = data.bookmarks.filter(b => b.userId === userId);

  if (collection) {
    bookmarks = bookmarks.filter(b => b.collection === collection);
  }
  if (type) {
    bookmarks = bookmarks.filter(b => b.content.type === type);
  }

  // 收集所有收藏夹名
  const collections = [...new Set(bookmarks.map(b => b.collection))];

  const total = bookmarks.length;
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
  const totalPages = Math.ceil(total / limitNum);
  const start = (pageNum - 1) * limitNum;
  const paged = bookmarks.slice(start, start + limitNum).sort((a, b) =>
    new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
  );

  res.json({
    success: true,
    data: paged,
    pagination: { page: pageNum, limit: limitNum, total, totalPages },
    collections,
  });
});

// POST /api/user/bookmarks
router.post('/', (req, res) => {
  const userId = req.user!.userId;
  const { content, collection = '默认收藏', note } = req.body;

  if (!content?.type || !content?.contentId || !content?.title) {
    res.status(400).json({ success: false, message: '缺少必填字段 (content.type/contentId/title)' });
    return;
  }

  const bookmark: Bookmark = {
    bookmarkId: uuid(),
    userId,
    content,
    collection,
    note: note || '',
    bookmarkedAt: new Date().toISOString(),
    isPinned: false,
    sortOrder: Date.now(),
  };

  store.update(data => {
    data.bookmarks.push(bookmark);
  });

  res.status(201).json({ success: true, bookmark });
});

// POST /api/user/bookmarks/toggle
router.post('/toggle', (req, res) => {
  const userId = req.user!.userId;
  const { content } = req.body;

  if (!content?.contentId) {
    res.status(400).json({ success: false, message: '缺少 contentId' });
    return;
  }

  let action: 'added' | 'removed' = 'added';
  let bookmark: Bookmark | undefined;

  store.update(data => {
    const existing = data.bookmarks.find(
      b => b.userId === userId && b.content.contentId === content.contentId
    );

    if (existing) {
      data.bookmarks = data.bookmarks.filter(b => b.bookmarkId !== existing.bookmarkId);
      action = 'removed';
    } else {
      bookmark = {
        bookmarkId: uuid(),
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
      };
      data.bookmarks.push(bookmark);
    }
  });

  res.json({ success: true, action, bookmark });
});

// POST /api/user/bookmarks/check
router.post('/check', (req, res) => {
  const userId = req.user!.userId;
  const { contentIds } = req.body as { contentIds: string[] };

  if (!Array.isArray(contentIds)) {
    res.status(400).json({ success: false, message: 'contentIds 应为数组' });
    return;
  }

  const data = store.get();
  const bookmarkedIds = data.bookmarks
    .filter(b => b.userId === userId && contentIds.includes(b.content.contentId))
    .map(b => b.content.contentId);

  res.json({ success: true, bookmarkedIds });
});

// DELETE /api/user/bookmarks/:contentId
router.delete('/:contentId', (req, res) => {
  const userId = req.user!.userId;
  const { contentId } = req.params;

  let removed = false;
  store.update(data => {
    const before = data.bookmarks.length;
    data.bookmarks = data.bookmarks.filter(
      b => !(b.userId === userId && b.content.contentId === contentId)
    );
    removed = data.bookmarks.length < before;
  });

  if (!removed) {
    res.status(404).json({ success: false, message: '收藏未找到' });
    return;
  }

  res.json({ success: true });
});

export default router;
