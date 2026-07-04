/**
 * DevHub 数据 API 路由
 * AutoSAR 规范数据（注册表路由已拆分到 registry.ts）
 *
 * GET /api/devhub/specs          — 获取规范索引
 * GET /api/devhub/specs/search   — 搜索规范
 * GET /api/devhub/specs/:module  — 获取某模块详细规范
 */
import { Router } from 'express';
import pool from '../services/db.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);

// GET /api/devhub/specs — 获取规范索引（从 api_specs 查询）
router.get('/specs', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT module_id AS id, module_id AS name, layer_id AS layer,
             COUNT(*)::int AS api_count,
             MIN(brief) AS sample_brief
      FROM api_specs
      GROUP BY module_id, layer_id
      ORDER BY layer_id, module_id
    `);

    // 整理成层级结构
    const layerMap: Record<string, any> = {};
    for (const row of result.rows) {
      const layerId = row.layer.toLowerCase();
      if (!layerMap[layerId]) {
        layerMap[layerId] = {
          id: layerId,
          name: row.layer,
          description: `${row.layer} 层驱动/服务`,
          modules: [],
        };
      }
      layerMap[layerId].modules.push(row);
    }

    res.json({ success: true, data: { layers: Object.values(layerMap) } });
  } catch (err: any) {
    console.error('[devhub] specs error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/devhub/specs/search?q=xxx — 搜索规范
router.get('/specs/search', async (req, res) => {
  try {
    const q = (req.query.q as string || '').trim();
    if (!q) {
      res.json({ success: true, data: [] });
      return;
    }

    const result = await pool.query(
      `SELECT id, name, module_id, layer_id, signature, brief
       FROM api_specs
       WHERE name ILIKE $1 OR brief ILIKE $1 OR signature ILIKE $1
       LIMIT 30`,
      [`%${q}%`]
    );

    res.json({ success: true, data: result.rows });
  } catch (err: any) {
    console.error('[devhub] search error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
