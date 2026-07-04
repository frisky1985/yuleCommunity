/**
 * spec API 路由 — 查询 AutoSAR 规范 API
 *
 * GET  /api/specs          — 列表查询 (支持 module/layer/search/paging)
 * GET  /api/specs/:id      — 单条详情
 * GET  /api/specs/modules  — 模块列表 (去重)
 */
import { Router, Request, Response } from 'express';
import pool from '../services/db.js';

const router = Router();

// GET /api/specs?module=Can&layer=MCAL&search=init&page=1&limit=20
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      module: moduleFilter,
      layer,
      search,
      page = '1',
      limit = '20',
      version: versionFilter,
    } = req.query as Record<string, string>;

    const conditions: string[] = [];
    const params: string[] = [];
    let paramIdx = 0;

    if (moduleFilter) {
      paramIdx++;
      conditions.push(`module_id = $${paramIdx}`);
      params.push(moduleFilter);
    }
    if (layer) {
      paramIdx++;
      conditions.push(`layer_id = $${paramIdx}`);
      params.push(layer);
    }
    if (versionFilter) {
      paramIdx++;
      conditions.push(`version = $${paramIdx}`);
      params.push(versionFilter);
    }
    if (search) {
      paramIdx++;
      conditions.push(
        `(name ILIKE $${paramIdx} OR brief ILIKE $${paramIdx} OR description ILIKE $${paramIdx})`
      );
      params.push(`%${search}%`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // 计数
    const countResult = await pool.query(`SELECT COUNT(*) FROM api_specs ${where}`, params);
    const total = parseInt(countResult.rows[0].count, 10);

    const p = Math.max(1, parseInt(page, 10));
    const l = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const offset = (p - 1) * l;

    const result = await pool.query(
      `SELECT id, module_id, layer_id, name, signature, brief, brief_cn,
              return_type, return_description, version, status,
              example_description, timing,
              (SELECT json_agg(json_build_object('name', sp_name, 'direction', sp_direction, 'type', sp_type, 'description', sp_description)) FROM jsonb_to_recordset(params) AS sp(name text, direction text, type text, description text)) AS params,
              see_also, example
       FROM api_specs ${where}
       ORDER BY module_id, name
       LIMIT $${paramIdx + 1} OFFSET $${paramIdx + 2}`,
      [...params, String(l), String(offset)]
    );

    res.json({
      success: true,
      data: result.rows.map(r => ({
        ...r,
        tags: [], // 保持与前端类型兼容
      })),
      pagination: {
        page: p,
        limit: l,
        total,
        totalPages: Math.ceil(total / l),
      },
    });
  } catch (err: any) {
    console.error('[specs] list error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/specs/modules — 获取模块列表
router.get('/modules', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT module_id AS id, module_id AS name,
              layer_id, COUNT(*) AS api_count,
              MIN(version) AS min_version,
              MAX(version) AS max_version
       FROM api_specs
       GROUP BY module_id, layer_id
       ORDER BY module_id`
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err: any) {
    console.error('[specs] modules error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/specs/:id — 单条规范详情
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM api_specs WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Spec not found' });
      return;
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error('[specs] get error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
