/**
 * yuleCommunity API Server — 入口
 * 数据库: PostgreSQL
 */
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import bookmarkRoutes from './routes/bookmarks.js';
import pointsRoutes from './routes/points.js';
import devhubRoutes from './routes/devhub.js';
import registryRoutes from './routes/registry.js';
import blogRoutes from './routes/blogs.js';
import adminRoutes from './routes/admin.js';
import specsRoutes from './routes/specs.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// 中间件
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://frisky1985.github.io',
    /\.github\.io$/,
  ],
  credentials: true,
}));
app.use(express.json());

// API 限流
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 分钟
  max: 200,             // 每 IP 最多 200 次/分钟
  message: { success: false, message: '请求过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// 请求日志
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'yuleCommunity API is running', version: '2.0.0' });
});

// 路由注册
app.use('/api/auth', authRoutes);
app.use('/api/user/bookmarks', bookmarkRoutes);
app.use('/api/user/points', pointsRoutes);
app.use('/api/devhub', devhubRoutes);
app.use('/api/devhub/registry', registryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/specs', specsRoutes);

// 全局错误处理
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[unhandled error]', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`🚀 yuleCommunity API server running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Database: PostgreSQL`);
});
