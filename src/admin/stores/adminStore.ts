import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'operator' | 'viewer';
  avatar?: string;
}

interface AdminState {
  user: AdminUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sidebarCollapsed: boolean;
  
  // Actions
  setUser: (user: AdminUser | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  toggleSidebar: () => void;
  logout: () => void;
}

type AdminStorePersist = Pick<AdminState, 'token' | 'refreshToken' | 'user' | 'isAuthenticated' | 'sidebarCollapsed'>;

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get): AdminState => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
      sidebarCollapsed: false,

      setUser: (user: AdminUser | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
      setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
      logout: () => set({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'admin-storage',
      partialize: (state: AdminState): AdminStorePersist => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    } as PersistOptions<AdminState, AdminStorePersist>
  )
);
