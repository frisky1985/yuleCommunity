/**
 * Admin 管理 API 路由
 *
 * GET    /api/admin/stats     — 仪表盘统计数据
 * GET    /api/admin/users     — 用户列表 (分页)
 * PATCH  /api/admin/users/:id/role — 修改用户角色
 * GET    /api/admin/blogs     — 后台博客列表 (含草稿)
 * GET    /api/admin/blogs/:id — 单篇文章完整内容 (含未发布)
 *
 * 所有接口要求 super_admin 或 admin 角色
 */
import { Router } from 'express';
import pool from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.user) {
    res.status(401).json({ success: false, message: '未登录' });
    return;
  }
  if (!['super_admin', 'admin'].includes(req.user.role)) {
    res.status(403).json({ success: false, message: '权限不足' });
    return;
  }
  next();
}

router.use(requireAuth, requireAdmin);

// GET /api/admin/stats
router.get('/stats', async (_req, res) => {
  try {
    const [userStats, blogStats, blogPending] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*)::int as total,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day')::int as today_new,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int as week_new
        FROM users
      `),
      pool.query(`
        SELECT
          COUNT(*)::int as total,
          COUNT(*) FILTER (WHERE status = 'draft')::int as draft,
          COUNT(*) FILTER (WHERE status = 'archived')::int as archived
        FROM blogs
      `),
      pool.query(`
        SELECT COUNT(*)::int as pending
        FROM blog_comments WHERE status = 'pending'
      `),
    ]);

    res.json({
      success: true,
      data: {
        users: userStats.rows[0],
        blogs: { ...blogStats.rows[0], pendingComments: blogPending.rows[0].pending },
      },
    });
  } catch (err) {
    console.error('[admin stats error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const { page = '1', limit = '20', search } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions: string[] = [];
    const params: any[] = [];

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(username ILIKE $${params.length} OR email ILIKE $${params.length})`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const countResult = await pool.query(`SELECT COUNT(*)::int as total FROM users ${where}`, params);
    const dataResult = await pool.query(
      `SELECT id, username, email, avatar, role, created_at, updated_at
       FROM users ${where} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limitNum, offset]
    );

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: { page: pageNum, limit: limitNum, total: countResult.rows[0].total },
    });
  } catch (err) {
    console.error('[admin users error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// PATCH /api/admin/users/:id/role
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'vip', 'admin', 'super_admin'].includes(role)) {
      res.status(400).json({ success: false, message: '无效的角色' });
      return;
    }

    await pool.query('UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2', [role, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('[admin role error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/admin/blogs — 管理后台博客列表 (含所有状态)
router.get('/blogs', async (req, res) => {
  try {
    const { page = '1', limit = '20', status, search } = req.query as Record<string, string>;
    const conditions: string[] = [];
    const params: any[] = [];

    if (status && ['draft', 'published', 'archived'].includes(status)) {
      params.push(status);
      conditions.push(`b.status = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(b.title ILIKE $${params.length} OR b.excerpt ILIKE $${params.length})`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    const countResult = await pool.query(
      `SELECT COUNT(*)::int as total FROM blogs b ${where}`,
      params
    );

    const dataResult = await pool.query(
      `SELECT b.id, b.title, b.slug, b.excerpt, b.status, b.view_count, b.is_featured,
              b.published_at, b.created_at, b.updated_at,
              c.name as category_name,
              u.username as author_name
       FROM blogs b
       LEFT JOIN categories c ON c.id = b.category_id
       LEFT JOIN users u ON u.id = b.author_id
       ${where}
       ORDER BY b.updated_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limitNum, offset]
    );

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: { page: pageNum, limit: limitNum, total: countResult.rows[0].total },
    });
  } catch (err) {
    console.error('[admin blogs error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/admin/blogs/:id
router.get('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT b.*, c.name as category_name, c.slug as category_slug,
              u.username as author_name, u.avatar as author_avatar
       FROM blogs b
       LEFT JOIN categories c ON c.id = b.category_id
       LEFT JOIN users u ON u.id = b.author_id
       WHERE b.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: '文章未找到' });
      return;
    }

    const blog = result.rows[0];
    res.json({
      success: true,
      data: {
        ...blog,
        tags: JSON.parse(blog.tags || '[]'),
        category: blog.category_id ? {
          id: blog.category_id, name: blog.category_name, slug: blog.category_slug,
        } : undefined,
      },
    });
  } catch (err) {
    console.error('[admin blog detail error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

export default router;
