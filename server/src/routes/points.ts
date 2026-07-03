/**
 * 积分 API 路由
 * GET    /api/user/points            — 获取积分信息 (需登录)
 * GET    /api/user/points/history    — 获取积分历史 (需登录)
 * POST   /api/user/points/earn       — 获取积分 (需登录)
 * GET    /api/user/points/rules      — 获取积分规则 (公开)
 * GET    /api/user/points/leaderboard — 积分排行榜 (公开)
 */
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { store } from '../services/storage.js';
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

// GET /api/user/points/rules — 公开
router.get('/rules', (_req, res) => {
  res.json({ success: true, data: POINTS_RULES });
});

// GET /api/user/points/leaderboard — 公开
router.get('/leaderboard', (_req, res) => {
  const data = store.get();
  const pointsPerUser: Record<string, { userId: string; username: string; total: number }> = {};

  for (const record of data.pointsRecords) {
    const user = data.users.find(u => u.id === record.userId);
    if (!user) continue;
    if (!pointsPerUser[record.userId]) {
      pointsPerUser[record.userId] = { userId: record.userId, username: user.username, total: 0 };
    }
    pointsPerUser[record.userId].total += record.points;
  }

  const leaderboard = Object.values(pointsPerUser)
    .sort((a, b) => b.total - a.total)
    .slice(0, 100);

  res.json({ success: true, data: leaderboard });
});

// 以下需要登录
router.use(requireAuth);

// 获取积分信息
router.get('/', (req, res) => {
  const userId = req.user!.userId;

  // 计算级别
  const getLevelInfo = (points: number) => {
    const thresholds = [
      { level: 1, title: '初级工程师', min: 0, max: 100 },
      { level: 2, title: '中级工程师', min: 101, max: 500 },
      { level: 3, title: '高级工程师', min: 501, max: 2000 },
      { level: 4, title: '技术专家', min: 2001, max: Infinity },
    ];
    for (const t of thresholds) {
      if (points >= t.min && (t.max === Infinity || points <= t.max)) {
        return t;
      }
    }
    return thresholds[thresholds.length - 1];
  };

  const data = store.get();
  const records = data.pointsRecords.filter(r => r.userId === userId);
  const total = records.reduce((sum, r) => sum + r.points, 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = records.filter(r => r.createdAt.startsWith(today));
  const todayEarned = todayRecords.filter(r => r.points > 0).length;

  const level = getLevelInfo(total);
  const totalEarned = records.filter(r => r.points > 0).reduce((s, r) => s + r.points, 0);
  const totalSpent = records.filter(r => r.points < 0).reduce((s, r) => s + Math.abs(r.points), 0);

  const actionCounts: Record<string, number> = {};
  for (const r of todayRecords) {
    actionCounts[r.action] = (actionCounts[r.action] || 0) + 1;
  }

  // 最常用的行为
  const actionStats: Record<string, number> = {};
  for (const r of records) {
    actionStats[r.action] = (actionStats[r.action] || 0) + 1;
  }
  const favoriteAction = Object.entries(actionStats)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const lastAction = records.length > 0 ? records[0] : null;

  res.json({
    success: true,
    data: {
      total,
      level: {
        current: level.level,
        title: level.title,
        nextLevelPoints: level.max === Infinity ? null : level.max,
        progress: level.max === Infinity ? 1 : (total - level.min) / (level.max - level.min),
      },
      today: {
        date: today,
        count: todayEarned,
        points: todayRecords.filter(r => r.points > 0).reduce((s, r) => s + r.points, 0),
        actions: actionCounts,
      },
      statistics: {
        totalEarned,
        totalSpent,
        favoriteAction,
        lastActionAt: lastAction?.createdAt || null,
      },
    },
  });
});

// 获取积分历史
router.get('/history', (req, res) => {
  const userId = req.user!.userId;
  const { page = '1', limit = '20' } = req.query as Record<string, string>;

  const data = store.get();
  const records = data.pointsRecords
    .filter(r => r.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
  const total = records.length;
  const start = (pageNum - 1) * limitNum;

  res.json({
    success: true,
    data: records.slice(start, start + limitNum),
    pagination: { page: pageNum, limit: limitNum, total },
  });
});

// 获取积分
router.post('/earn', (req, res) => {
  const userId = req.user!.userId;
  const { action, reference } = req.body as {
    action: string;
    reference?: { type: string; id: string; title: string };
  };

  const rule = POINTS_RULES[action];
  if (!rule) {
    res.status(400).json({ success: false, message: `未知行为: ${action}` });
    return;
  }

  const data = store.get();
  const records = data.pointsRecords.filter(r => r.userId === userId);
  const total = records.reduce((sum, r) => sum + r.points, 0);

  // 检查每日限制
  if (rule.dailyLimit) {
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = records.filter(
      r => r.action === action && r.createdAt.startsWith(today) && r.points > 0
    ).length;
    if (todayCount >= rule.dailyLimit) {
      res.status(429).json({ success: false, message: `今日已满 (${rule.dailyLimit}/${rule.dailyLimit})` });
      return;
    }
  }

  const newRecord = {
    historyId: uuid(),
    userId,
    action,
    points: rule.points,
    balance: total + rule.points,
    description: '',
    reference,
    createdAt: new Date().toISOString(),
  };

  store.update(d => {
    d.pointsRecords.push(newRecord);
  });

  res.json({ success: true, data: newRecord });
});

export default router;
