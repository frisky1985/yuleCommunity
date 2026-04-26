import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PageLoader } from './components/PageLoader';
import { ThemeProvider } from './contexts/ThemeContext';
// 首页
import { HomePage } from './pages/HomePage';
// 开源页面
import { OpenSourcePage } from './pages/opensource/OpenSourcePage';
import { ToolchainPage } from './pages/opensource/ToolchainPage';
// 学习页面
import { LearningPage } from './pages/learning/LearningPage';
import { DocsPage } from './pages/learning/DocsPage';
import { BlogPage } from './pages/learning/BlogPage';
// 社区页面
import { CommunityPage } from './pages/community/CommunityPage';
import { ForumPage } from './pages/community/ForumPage';
import { QAPage } from './pages/community/QAPage';
import { EventsPage } from './pages/community/EventsPage';
// 管理后台
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
function App() {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(OfflineIndicator, {}), _jsx(Navbar, {}), _jsx("main", { className: "pt-16", children: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/opensource", element: _jsx(OpenSourcePage, {}) }), _jsx(Route, { path: "/toolchain", element: _jsx(ToolchainPage, {}) }), _jsx(Route, { path: "/learning", element: _jsx(LearningPage, {}) }), _jsx(Route, { path: "/docs", element: _jsx(DocsPage, {}) }), _jsx(Route, { path: "/blog", element: _jsx(BlogPage, {}) }), _jsx(Route, { path: "/community", element: _jsx(CommunityPage, {}) }), _jsx(Route, { path: "/forum", element: _jsx(ForumPage, {}) }), _jsx(Route, { path: "/qa", element: _jsx(QAPage, {}) }), _jsx(Route, { path: "/events", element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(AdminLoginPage, {}) }), _jsx(Route, { path: "*", element: _jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh]", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }), _jsx("p", { className: "text-muted-foreground", children: "\u9875\u9762\u4E0D\u5B58\u5728" })] }) })] }) }) }), _jsx(Footer, {})] }) }));
}
export default App;
