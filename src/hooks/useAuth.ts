/**
 * 用户认证 Hook
 * @description 管理用户登录状态和 Token（sessionStorage，关闭标签页即失效）
 */

import { useState, useEffect, useCallback } from 'react';
import { safeSessionGet, safeSessionSet, safeSessionRemove } from '../lib/utils';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'vip' | 'admin' | 'super_admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const USER_KEY = 'yuletech:auth:user';
const TOKEN_KEY = 'yuletech:auth:token';

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    // Synchronous read from sessionStorage for instant init
    const userRaw = safeSessionGet(USER_KEY);
    const token = safeSessionGet(TOKEN_KEY);
    if (userRaw && token) {
      try {
        const user = JSON.parse(userRaw) as User;
        return { user, token, isAuthenticated: true, isLoading: false };
      } catch { /* fall through */ }
    }
    return { user: null, token: null, isAuthenticated: false, isLoading: false };
  });

  // Async re-check on mount (catch edge cases from SSR or stale data)
  useEffect(() => {
    const token = safeSessionGet(TOKEN_KEY);
    if (token && !auth.isAuthenticated) {
      const userRaw = safeSessionGet(USER_KEY);
      if (userRaw) {
        try {
          const user = JSON.parse(userRaw) as User;
          setAuth({ user, token, isAuthenticated: true, isLoading: false });
          return;
        } catch { /* fall through */ }
      }
    }
    setAuth(prev => ({ ...prev, isLoading: false }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback((user: User, token: string) => {
    safeSessionSet(USER_KEY, JSON.stringify(user));
    safeSessionSet(TOKEN_KEY, token);
    setAuth({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    safeSessionRemove(USER_KEY);
    safeSessionRemove(TOKEN_KEY);
    setAuth({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setAuth(prev => {
      if (!prev.user) return prev;
      const newUser = { ...prev.user, ...updates };
      safeSessionSet(USER_KEY, JSON.stringify(newUser));
      return { ...prev, user: newUser };
    });
  }, []);

  return {
    ...auth,
    login,
    logout,
    updateUser,
  };
}

export default useAuth;
