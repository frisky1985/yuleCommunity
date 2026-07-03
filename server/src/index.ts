/**
 * yuleCommunity API Server — 入口
 * 数据库: PostgreSQL
 */
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import bookmarkRoutes from './routes/bookmarks.js';
import pointsRoutes from './routes/points.js';
import devhubRoutes from './routes/devhub.js';
import blogRoutes from './routes/blogs.js';
import adminRoutes from './routes/admin.js';

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
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

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
