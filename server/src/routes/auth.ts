/**
 * 用户认证路由
 * POST   /api/auth/register  — 注册
 * POST   /api/auth/login      — 登录
 * GET    /api/auth/me         — 获取当前用户信息 (需登录)
 */
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import pool, { runMigrations } from '../services/db.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

// 启动时确保表存在
runMigrations();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: '用户名、邮箱和密码为必填项' });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ success: false, message: '密码至少 6 位' });
      return;
    }

    // 检查重复
    const dupCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2 LIMIT 1',
      [email, username]
    );
    if (dupCheck.rows.length > 0) {
      const existing = dupCheck.rows[0];
      const userCheck = await pool.query('SELECT email FROM users WHERE id = $1', [existing.id]);
      const existingEmail = userCheck.rows[0]?.email;
      if (existingEmail === email) {
        res.status(409).json({ success: false, message: '该邮箱已注册' });
      } else {
        res.status(409).json({ success: false, message: '该用户名已被使用' });
      }
      return;
    }

    const id = uuid();
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();

    await pool.query(
      `INSERT INTO users (id, username, email, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, 'user', $5, $5)`,
      [id, username, email, hashedPassword, now]
    );

    const token = signToken({ userId: id, username, role: 'user' });

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: { id, username, email, role: 'user' },
        token,
      },
    });
  } catch (err) {
    console.error('[register error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: '邮箱和密码为必填项' });
      return;
    }

    const result = await pool.query(
      'SELECT id, username, email, password, avatar, role FROM users WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ success: false, message: '邮箱或密码错误' });
      return;
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ success: false, message: '邮箱或密码错误' });
      return;
    }

    const token = signToken({ userId: user.id, username: user.username, role: user.role });

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar, role: user.role },
        token,
      },
    });
  } catch (err) {
    console.error('[login error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, avatar, role, created_at FROM users WHERE id = $1 LIMIT 1',
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }

    const u = result.rows[0];
    res.json({
      success: true,
      data: {
        id: u.id,
        username: u.username,
        email: u.email,
        avatar: u.avatar,
        role: u.role,
        createdAt: u.created_at,
      },
    });
  } catch (err) {
    console.error('[me error]', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

export default router;
