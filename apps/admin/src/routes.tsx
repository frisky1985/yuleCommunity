import { RouteObject } from 'react-router-dom';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminContent } from './pages/AdminContent';
import { AdminSettings } from './pages/AdminSettings';
import { AdminLoginPage } from './pages/AdminLoginPage';

export const routes: RouteObject[] = [
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/users', element: <AdminUsers /> },
  { path: '/admin/content', element: <AdminContent /> },
  { path: '/admin/settings', element: <AdminSettings /> },
];

export default routes;
