/**
 * 积分 API 路由 (PostgreSQL 版)
 * GET    /api/user/points            — 获取积分信息 (需登录)
 * GET    /api/user/points/history    — 获取积分历史 (需登录)
 * POST   /api/user/points/earn       — 获取积分 (需登录)
 * GET    /api/user/points/rules      — 积分规则 (公开)
 * GET    /api/user/points/leaderboard — 积分排行榜 (公开)
 */
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import pool from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const POINTS_RULES: Record<string, { points: number; dailyLimit?: number }> = {
  post: { points: 10, dailyLimit: 20 },
  reply: { points: 5, dailyLimit: 50 },
  answer: { points: 15, dailyLimit: 10 },
  accepted: { points: 50 },
  event: { points: 20 },
  daily_visit: { points: 1, dailyLimit: 1 },
  share: { points: 3, dailyLimit: 5 },
};

const LEVELS = [
  { level: 1, title: '初级工程师', min: 0, max: 100 },
  { level: 2, title: '中级工程师', min: 101, max: 500 },
  { level: 3, title: '高级工程师', min: 501, max: 2000 },
  { level: 4, title: '技术专家', min: 2001, max: 5000 },
  { level: 5, title: '架构师', min: 5001, max: Infinity },
];

function getLevel(points: number) {
  for (const l of LEVELS) {
    if (points >= l.min && points <= l.max) {
      return {
        current: l.level,
        title: l.title,
        nextLevelPoints: l.max === Infinity ? null : l.max,
        progress: l.max === Infinity ? 1 : Math.min(1, (points - l.min) / (l.max - l.min)),
      };
    }
  }
  return { current: 5, title: '架构师', nextLevelPoints: null, progress: 1 };
}

// GET /api/user/points/rules — 公开
router.get('/rules', (_req, res) => {
  res.json({ success: true, data: POINTS_RULES });
});

// GET /api/user/points/leaderboard — 公开
router.get('/leaderboard', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, COALESCE(SUM(pr.points), 0) as total
       FROM users u
       LEFT JOIN points_records pr ON pr.user_id = u.id AND pr.points > 0
       GROUP BY u.id, u.username
       ORDER BY total DESC
       LIMIT 100`
    );

    res.json({
      success: true,
      data: result.rows.map(r => ({ userId: r.id, username: r.username, total: parseInt(r.total, 10) })),
    });
  } catch (err) {
    console.error('[leaderboard error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// 以下需要登录
router.use(requireAuth);

// GET /api/user/points
router.get('/', async (req, res) => {
  try {
    const userId = req.user!.userId;

    // 总数
    const totalResult = await pool.query(
      'SELECT COALESCE(SUM(points), 0) as total FROM points_records WHERE user_id = $1',
      [userId]
    );
    const total = parseInt(totalResult.rows[0].total, 10);

    const level = getLevel(total);

    // 今日统计
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const todayResult = await pool.query(
      `SELECT COALESCE(SUM(points), 0) as points,
              COUNT(*) FILTER (WHERE points > 0) as count,
              jsonb_agg(DISTINCT action) as actions
       FROM points_records
       WHERE user_id = $1 AND created_at >= $2`,
      [userId, todayStart]
    );

    const todayRow = todayResult.rows[0];
    const todayActions: Record<string, number> = {};

    if (todayRow.actions) {
      for (const action of todayRow.actions) {
        const cntResult = await pool.query(
          'SELECT COUNT(*) as c FROM points_records WHERE user_id = $1 AND action = $2 AND created_at >= $3 AND points > 0',
          [userId, action, todayStart]
        );
        todayActions[action] = parseInt(cntResult.rows[0].c, 10);
      }
    }

    // 总统计
    const statsResult = await pool.query(
      `SELECT
         COALESCE(SUM(points) FILTER (WHERE points > 0), 0) as earned,
         COALESCE(SUM(ABS(points)) FILTER (WHERE points < 0), 0) as spent,
         MAX(created_at) as last_action
       FROM points_records WHERE user_id = $1`,
      [userId]
    );

    // 最常用行为
    const favResult = await pool.query(
      `SELECT action, COUNT(*) as cnt
       FROM points_records WHERE user_id = $1 AND points > 0
       GROUP BY action ORDER BY cnt DESC LIMIT 1`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        total,
        level,
        today: {
          date: today.toISOString().slice(0, 10),
          count: parseInt(todayRow.count, 10),
          points: parseInt(todayRow.points, 10),
          actions: todayActions,
        },
        statistics: {
          totalEarned: parseInt(statsResult.rows[0].earned, 10),
          totalSpent: parseInt(statsResult.rows[0].spent, 10),
          favoriteAction: favResult.rows[0]?.action || null,
          lastActionAt: statsResult.rows[0].last_action || null,
        },
      },
    });
  } catch (err) {
    console.error('[points get error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/user/points/history
router.get('/history', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { page = '1', limit = '20' } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    const countResult = await pool.query(
      'SELECT COUNT(*) as total FROM points_records WHERE user_id = $1',
      [userId]
    );

    const dataResult = await pool.query(
      `SELECT * FROM points_records WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [userId, limitNum, offset]
    );

    const data = dataResult.rows.map(r => ({
      historyId: r.history_id,
      userId: r.user_id,
      action: r.action,
      points: r.points,
      balance: r.balance,
      description: r.description,
      reference: r.ref_id ? {
        type: r.ref_type,
        id: r.ref_id,
        title: r.ref_title,
        url: r.ref_url || undefined,
      } : undefined,
      createdAt: r.created_at,
    }));

    res.json({
      success: true,
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: parseInt(countResult.rows[0].total, 10),
      },
    });
  } catch (err) {
    console.error('[points history error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// POST /api/user/points/earn
router.post('/earn', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { action, reference } = req.body as {
      action: string;
      reference?: { type: string; id: string; title: string; url?: string };
    };

    const rule = POINTS_RULES[action];
    if (!rule) {
      res.status(400).json({ success: false, message: `未知行为: ${action}` });
      return;
    }

    // 检查每日限制
    if (rule.dailyLimit) {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const dailyResult = await pool.query(
        `SELECT COUNT(*) as cnt FROM points_records
         WHERE user_id = $1 AND action = $2 AND points > 0 AND created_at >= $3`,
        [userId, action, todayStart]
      );

      if (parseInt(dailyResult.rows[0].cnt, 10) >= rule.dailyLimit) {
        res.status(429).json({ success: false, message: `今日已满 (${rule.dailyLimit}/${rule.dailyLimit})` });
        return;
      }
    }

    // 获得当前余额
    const balanceResult = await pool.query(
      'SELECT COALESCE(SUM(points), 0) as balance FROM points_records WHERE user_id = $1',
      [userId]
    );
    const currentBalance = parseInt(balanceResult.rows[0].balance, 10);
    const newBalance = currentBalance + rule.points;

    const historyId = uuid();

    await pool.query(
      `INSERT INTO points_records (history_id, user_id, action, points, balance, description, ref_type, ref_id, ref_title, ref_url)
       VALUES ($1, $2, $3, $4, $5, '', $6, $7, $8, $9)`,
      [
        historyId, userId, action, rule.points, newBalance,
        reference?.type || '', reference?.id || '', reference?.title || '',
        reference?.url || '',
      ]
    );

    res.json({
      success: true,
      data: {
        historyId,
        userId,
        action,
        points: rule.points,
        balance: newBalance,
        description: '',
        reference: reference || undefined,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[points earn error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

export default router;
