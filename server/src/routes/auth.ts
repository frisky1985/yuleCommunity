/**
 * 用户认证路由
 * POST   /api/auth/register  — 注册
 * POST   /api/auth/login      — 登录
 * GET    /api/auth/me         — 获取当前用户信息 (需登录)
 */
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { store } from '../services/storage.js';
import { signToken, requireAuth } from '../middleware/auth.js';
import type { User } from '../types/index.js';

const router = Router();

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

    const data = store.get();

    // 检查重复
    if (data.users.find(u => u.email === email)) {
      res.status(409).json({ success: false, message: '该邮箱已注册' });
      return;
    }
    if (data.users.find(u => u.username === username)) {
      res.status(409).json({ success: false, message: '该用户名已被使用' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    const newUser: User = {
      id: uuid(),
      username,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: now,
      updatedAt: now,
    };

    store.save({ ...data, users: [...data.users, newUser] });

    const token = signToken({ userId: newUser.id, username: newUser.username, role: newUser.role });

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role },
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

    const data = store.get();
    const user = data.users.find(u => u.email === email);

    if (!user) {
      res.status(401).json({ success: false, message: '邮箱或密码错误' });
      return;
    }

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
router.get('/me', requireAuth, (req, res) => {
  const data = store.get();
  const user = data.users.find(u => u.id === req.user!.userId);

  if (!user) {
    res.status(404).json({ success: false, message: '用户不存在' });
    return;
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

export default router;
