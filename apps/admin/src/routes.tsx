import type { RouteObject } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminContent } from './pages/AdminContent';
import { AdminSettings } from './pages/AdminSettings';
import { AdminLoginPage } from './pages/AdminLoginPage';

export const routes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'content',
        element: <AdminContent />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
];

export default routes;
