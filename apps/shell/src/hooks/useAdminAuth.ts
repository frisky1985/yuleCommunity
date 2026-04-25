import { useState, useEffect } from 'react';

interface AdminAuthState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

export function useAdminAuth(): AdminAuthState {
  const [authState, setAuthState] = useState<{
    isAdmin: boolean;
    isLoggedIn: boolean;
  }>({
    isAdmin: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        setAuthState({
          isAdmin: session.isAdmin || false,
          isLoggedIn: session.isLoggedIn || false,
        });
      } catch {
        setAuthState({ isAdmin: false, isLoggedIn: false });
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('adminSession');
    setAuthState({ isAdmin: false, isLoggedIn: false });
    window.location.href = '/admin/login';
  };

  return {
    ...authState,
    logout,
  };
}
