/**
 * Registry API 路由 — AutoSAR BSW 模块仓库后端
 *
 * GET  /api/devhub/registry            — 模块列表 (支持搜索/筛选/分页)
 * GET  /api/devhub/registry/stats      — 统计信息
 * GET  /api/devhub/registry/:id        — 模块详情 (含版本历史)
 * POST /api/devhub/registry/:id/review — 提交评价 (需登录)
 */
import { Router, Request, Response } from 'express';
import pool from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/devhub/registry
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      search,
      layer,
      mcu,
      os,
      sort = 'downloads',
      page = '1',
      limit = '20',
    } = req.query as Record<string, string>;

    const conditions: string[] = [];
    const params: string[] = [];
    let idx = 0;

    // 默认只显示 published (admin/super_admin 可见全部)
    if (!req.user?.role || !['admin', 'super_admin'].includes(req.user.role)) {
      idx++;
      conditions.push(`status = $${idx}`);
      params.push('published');
    }

    if (search) {
      idx++;
      conditions.push(`(name ILIKE $${idx} OR description ILIKE $${idx} OR tags::text ILIKE $${idx})`);
      params.push(`%${search}%`);
    }
    if (layer) {
      idx++;
      conditions.push(`layer = $${idx}`);
      params.push(layer);
    }
    if (mcu) {
      idx++;
      conditions.push(`compatibility->'mcu' @> $${idx}::jsonb`);
      params.push(JSON.stringify([mcu]));
    }
    if (os) {
      idx++;
      conditions.push(`compatibility->'os' @> $${idx}::jsonb`);
      params.push(JSON.stringify([os]));
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // 计数
    const countResult = await pool.query(`SELECT COUNT(*) FROM registry_modules ${where}`, params);
    const total = parseInt(countResult.rows[0].count, 10);

    // 排序
    let orderBy = '';
    switch (sort) {
      case 'downloads': orderBy = `stats->>'downloads' DESC`; break;
      case 'rating':    orderBy = `stats->>'rating' DESC`; break;
      case 'newest':    orderBy = `created_at DESC`; break;
      case 'name':      orderBy = `name ASC`; break;
      default:          orderBy = `stats->>'downloads' DESC`;
    }

    const p = Math.max(1, parseInt(page, 10));
    const l = Math.min(100, Math.max(1, parseInt(limit, 10)));

    const result = await pool.query(
      `SELECT id, name, version, layer, description, tags, author,
              compatibility, dependencies, stats, status,
              created_at, updated_at, published_at
       FROM registry_modules ${where}
       ORDER BY ${orderBy}
       LIMIT $${idx + 1} OFFSET $${idx + 2}`,
      [...params, String(l), String((p - 1) * l)]
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) },
    });
  } catch (err: any) {
    console.error('[registry] list error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/devhub/registry/stats — 统计信息
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total_modules,
        COALESCE(SUM((stats->>'downloads')::int), 0)::int AS total_downloads,
        COUNT(DISTINCT layer)::int AS layer_count,
        (SELECT json_agg(DISTINCT mcu_val)
         FROM registry_modules,
              jsonb_array_elements_text(compatibility->'mcu') AS mcu_val
         WHERE status='published') AS mcus
      FROM registry_modules WHERE status='published'
    `);

    const data = result.rows[0] || { total_modules: 0, total_downloads: 0, layer_count: 0, mcus: [] };

    res.json({ success: true, data });
  } catch (err: any) {
    console.error('[registry] stats error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/devhub/registry/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM registry_modules WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Module not found' });
      return;
    }

    const module = result.rows[0];

    // 如果非 admin 且未发布，拒绝
    if (module.status !== 'published' && (!req.user?.role || !['admin', 'super_admin'].includes(req.user.role))) {
      res.status(404).json({ success: false, message: 'Module not found' });
      return;
    }

    // 版本历史
    const versions = await pool.query(
      `SELECT id, version, release_notes, created_at
       FROM registry_versions WHERE module_id = $1
       ORDER BY created_at DESC`,
      [id]
    );

    // 评价
    const reviews = await pool.query(
      `SELECT r.id, r.rating, r.content, r.created_at,
              u.username, u.avatar
       FROM registry_reviews r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.module_id = $1
       ORDER BY r.created_at DESC
       LIMIT 20`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...module,
        versionHistory: versions.rows,
        reviews: reviews.rows,
      },
    });
  } catch (err: any) {
    console.error('[registry] get error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/devhub/registry/:id/review — 提交评价
router.post('/:id/review', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, content } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
      return;
    }

    const reviewId = `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await pool.query(
      `INSERT INTO registry_reviews (id, module_id, user_id, rating, content)
       VALUES ($1, $2, $3, $4, $5)`,
      [reviewId, id, req.user!.userId, rating, content || '']
    );

    // 更新模块评分（COALESCE 兜底 NULL stats）
    await pool.query(`
      UPDATE registry_modules
      SET stats = jsonb_set(
        COALESCE(stats, '{}'::jsonb),
        '{rating}', (
          SELECT COALESCE(AVG(rating)::text::jsonb, '0'::jsonb)
          FROM registry_reviews WHERE module_id = $1
        )
      ) || jsonb_build_object(
        'reviewCount', (SELECT COUNT(*)::int FROM registry_reviews WHERE module_id = $1),
        'downloads', COALESCE((stats->>'downloads')::int, 0)
      )
      WHERE id = $1
    `, [id]);

    res.json({ success: true, data: { id: reviewId } });
  } catch (err: any) {
    console.error('[registry] review error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
