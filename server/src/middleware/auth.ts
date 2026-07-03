/**
 * JWT 认证中间件
 */
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthPayload } from '../types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yulecommunity-dev-secret-2026';
const JWT_EXPIRES_IN = '7d';

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

/** 需要登录的中间件 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: '未登录' });
    return;
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token 已过期或无效' });
  }
}

/** 可选登录 — 有 token 就解析，没有也能过 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      req.user = verifyToken(authHeader.split(' ')[1]);
    } catch {
      // ignore invalid token
    }
  }
  next();
}
