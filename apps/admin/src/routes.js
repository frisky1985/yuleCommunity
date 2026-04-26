import { jsx as _jsx } from "react/jsx-runtime";
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminContent } from './pages/AdminContent';
import { AdminSettings } from './pages/AdminSettings';
import { AdminLoginPage } from './pages/AdminLoginPage';
export const routes = [
    { path: '/admin/login', element: _jsx(AdminLoginPage, {}) },
    { path: '/admin/dashboard', element: _jsx(AdminDashboard, {}) },
    { path: '/admin/users', element: _jsx(AdminUsers, {}) },
    { path: '/admin/content', element: _jsx(AdminContent, {}) },
    { path: '/admin/settings', element: _jsx(AdminSettings, {}) },
];
export default routes;
