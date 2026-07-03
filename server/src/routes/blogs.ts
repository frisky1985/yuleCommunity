/**
 * 博客内容 API 路由
 *
 * 公开:
 *   GET    /api/blogs               — 文章列表 (分页/筛选)
 *   GET    /api/blogs/:slug         — 文章详情 (按 slug)
 *   GET    /api/blogs/categories    — 分类列表
 *
 * 管理 (需 Admin 或 super_admin 角色):
 *   POST   /api/admin/blogs         — 新建文章
 *   PUT    /api/admin/blogs/:id     — 编辑文章
 *   DELETE /api/admin/blogs/:id     — 删除文章
 *   PATCH  /api/admin/blogs/:id/status — 修改状态
 *   POST   /api/admin/categories    — 新建/编辑分类
 *   DELETE /api/admin/categories/:id — 删除分类
 */
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import pool from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';
import type { AuthPayload } from '../types/index.js';

const router = Router();

// ── 辅助函数 ──

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function requireRole(...roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      res.status(401).json({ success: false, message: '未登录' });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: '权限不足' });
      return;
    }
    next();
  };
}

// ── 公开 API ──

// GET /api/blogs/categories
router.get('/categories', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, COUNT(b.id) as blog_count
       FROM categories c
       LEFT JOIN blogs b ON b.category_id = c.id AND b.status = 'published'
       GROUP BY c.id ORDER BY c.sort_order ASC`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('[categories error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const {
      page = '1', limit = '20', status = 'published',
      category, tag, search, sort = 'published_at',
    } = req.query as Record<string, string>;

    const conditions: string[] = [];
    const params: any[] = [];

    // 公开 API 默认只显示已发布
    conditions.push('b.status = $1');
    params.push(status);

    if (category) {
      params.push(category);
      conditions.push(`c.slug = $${params.length}`);
    }
    if (tag) {
      params.push(tag);
      conditions.push(`b.tags::jsonb ? $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(b.title ILIKE $${params.length} OR b.excerpt ILIKE $${params.length})`);
    }

    const where = conditions.join(' AND ');
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    const allowedSorts: Record<string, string> = {
      published_at: 'b.published_at DESC',
      view_count: 'b.view_count DESC',
      title: 'b.title ASC',
      created_at: 'b.created_at DESC',
    };
    const orderBy = allowedSorts[sort] || 'b.published_at DESC';

    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM blogs b LEFT JOIN categories c ON c.id = b.category_id WHERE ${where}`,
      params
    );

    const dataResult = await pool.query(
      `SELECT
        b.id, b.title, b.slug, b.excerpt, b.tags,
        b.author_id, b.view_count, b.like_count, b.cover_image,
        b.is_featured, b.published_at, b.created_at,
        c.id as category_id, c.name as category_name, c.slug as category_slug,
        u.username as author_name
       FROM blogs b
       LEFT JOIN categories c ON c.id = b.category_id
       LEFT JOIN users u ON u.id = b.author_id
       WHERE ${where}
       ORDER BY b.is_featured DESC, ${orderBy}
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limitNum, offset]
    );

    res.json({
      success: true,
      data: dataResult.rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        excerpt: r.excerpt,
        tags: JSON.parse(r.tags || '[]'),
        coverImage: r.cover_image || undefined,
        author: { id: r.author_id, name: r.author_name },
        category: r.category_id ? { id: r.category_id, name: r.category_name, slug: r.category_slug } : undefined,
        viewCount: r.view_count,
        likeCount: r.like_count,
        isFeatured: r.is_featured,
        publishedAt: r.published_at,
        createdAt: r.created_at,
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: parseInt(countResult.rows[0].total, 10),
        totalPages: Math.ceil(parseInt(countResult.rows[0].total, 10) / limitNum),
      },
    });
  } catch (err) {
    console.error('[blogs list error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/blogs/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `SELECT
        b.*, c.name as category_name, c.slug as category_slug,
        u.username as author_name, u.avatar as author_avatar
       FROM blogs b
       LEFT JOIN categories c ON c.id = b.category_id
       LEFT JOIN users u ON u.id = b.author_id
       WHERE b.slug = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: '文章未找到' });
      return;
    }

    const blog = result.rows[0];

    // 增加阅读计数
    pool.query('UPDATE blogs SET view_count = view_count + 1 WHERE id = $1', [blog.id]).catch(() => {});

    res.json({
      success: true,
      data: {
        ...blog,
        tags: JSON.parse(blog.tags || '[]'),
        category: blog.category_id ? {
          id: blog.category_id, name: blog.category_name, slug: blog.category_slug,
        } : undefined,
        author: { id: blog.author_id, name: blog.author_name, avatar: blog.author_avatar || undefined },
      },
    });
  } catch (err) {
    console.error('[blog detail error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// ── 管理 API (需要 super_admin 或 admin 角色) ──

const adminOnly = requireRole('super_admin', 'admin');
const routerAdmin = Router();

// POST /api/admin/blogs
routerAdmin.post('/blogs', requireAuth, adminOnly, async (req, res) => {
  try {
    const { title, content, excerpt, category_id, tags, cover_image, status = 'draft' } = req.body;
    if (!title) {
      res.status(400).json({ success: false, message: '标题为必填项' });
      return;
    }

    const id = uuid();
    const baseSlug = slugify(title);
    // 处理 slug 重复
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await pool.query('SELECT id FROM blogs WHERE slug = $1', [slug]);
      if (existing.rows.length === 0) break;
      slug = `${baseSlug}-${counter++}`;
    }

    const authorId = req.user!.userId;
    const publishedAt = status === 'published' ? new Date() : null;

    await pool.query(
      `INSERT INTO blogs (id, title, slug, content, excerpt, category_id, tags, author_id, status, cover_image, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [id, title, slug, content || '', excerpt || '', category_id || null,
       JSON.stringify(tags || []), authorId, status, cover_image || '', publishedAt]
    );

    res.status(201).json({ success: true, data: { id, slug } });
  } catch (err) {
    console.error('[blog create error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// PUT /api/admin/blogs/:id
routerAdmin.put('/blogs/:id', requireAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, category_id, tags, cover_image, status } = req.body;

    const existing = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      res.status(404).json({ success: false, message: '文章未找到' });
      return;
    }

    const current = existing.rows[0];
    const newSlug = title && title !== current.title ? slugify(title) : current.slug;
    const publishedAt = status === 'published' && !current.published_at ? new Date() : current.published_at;

    await pool.query(
      `UPDATE blogs SET
        title = COALESCE($1, title), slug = COALESCE($2, slug),
        content = COALESCE($3, content), excerpt = COALESCE($4, excerpt),
        category_id = $5, tags = COALESCE($6, tags),
        cover_image = COALESCE($7, cover_image), status = COALESCE($8, status),
        published_at = COALESCE($9, published_at), updated_at = NOW()
       WHERE id = $10`,
      [title || null, newSlug, content || null, excerpt || null,
       category_id ?? current.category_id, tags ? JSON.stringify(tags) : null,
       cover_image ?? null, status || null, publishedAt, id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[blog update error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// PATCH /api/admin/blogs/:id/status
routerAdmin.patch('/blogs/:id/status', requireAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      res.status(400).json({ success: false, message: '无效的状态值' });
      return;
    }

    const publishedAt = status === 'published' ? new Date() : null;

    await pool.query(
      'UPDATE blogs SET status = $1, published_at = COALESCE($2, published_at), updated_at = NOW() WHERE id = $3',
      [status, publishedAt, id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[blog status error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// DELETE /api/admin/blogs/:id
routerAdmin.delete('/blogs/:id', requireAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('[blog delete error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// POST /api/admin/categories
routerAdmin.post('/categories', requireAuth, adminOnly, async (req, res) => {
  try {
    const { name, description, parent_id, sort_order } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: '分类名称为必填项' });
      return;
    }
    const id = uuid();
    const slug = slugify(name);
    await pool.query(
      'INSERT INTO categories (id, name, slug, description, parent_id, sort_order) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (name) DO UPDATE SET sort_order = EXCLUDED.sort_order',
      [id, name, slug, description || '', parent_id || null, sort_order || 0]
    );
    res.status(201).json({ success: true, data: { id, name, slug } });
  } catch (err) {
    console.error('[category create error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// DELETE /api/admin/categories/:id
routerAdmin.delete('/categories/:id', requireAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('[category delete error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// Admin 级联路由 — 挂到 /api/admin
router.use('/admin', routerAdmin);

export default router;
