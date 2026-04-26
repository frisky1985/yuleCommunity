import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, HelpCircle, Calendar, Settings, LogOut, Menu, X, Shield, ChevronLeft, ChevronRight, } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
const navItems = [
    { label: '仪表盘', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: '用户管理', to: '/admin/users', icon: Users },
    { label: '内容管理', to: '/admin/content', icon: MessageSquare },
    { label: '问答管理', to: '/admin/content?tab=qa', icon: HelpCircle },
    { label: '活动管理', to: '/admin/content?tab=events', icon: Calendar },
    { label: '系统设置', to: '/admin/settings', icon: Settings },
];
export function AdminLayout() {
    const { isAdmin, logout } = useAdminAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login', { replace: true });
        }
    }, [isAdmin, navigate]);
    if (!isAdmin) {
        return null;
    }
    const isActive = (to) => {
        if (to.includes('?')) {
            return location.pathname === to.split('?')[0] && location.search === to.slice(to.indexOf('?'));
        }
        return location.pathname === to;
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground flex", children: [sidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-40 md:hidden", onClick: () => setSidebarOpen(false) })), _jsxs("aside", { className: `fixed md:sticky top-0 left-0 h-screen bg-card border-r border-border z-50 transition-all duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${sidebarExpanded ? 'w-60' : 'w-16'}`, children: [_jsxs("div", { className: "h-16 flex items-center px-4 border-b border-border", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0", children: _jsx(Shield, { className: "w-4 h-4 text-white" }) }), sidebarExpanded && (_jsx("span", { className: "ml-3 font-bold text-sm tracking-tight whitespace-nowrap", children: "\u7BA1\u7406\u540E\u53F0" }))] }), _jsx("nav", { className: "flex-1 py-4 space-y-1 overflow-y-auto", children: navItems.map((item) => {
                            const active = isActive(item.to);
                            return (_jsxs(Link, { to: item.to, onClick: () => setSidebarOpen(false), className: `flex items-center mx-2 rounded-lg transition-colors ${sidebarExpanded ? 'px-3 py-2 gap-3' : 'px-2 py-2 justify-center'} ${active
                                    ? 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`, title: item.label, children: [_jsx(item.icon, { className: "w-5 h-5 flex-shrink-0" }), sidebarExpanded && (_jsx("span", { className: "text-sm font-medium whitespace-nowrap", children: item.label }))] }, item.to));
                        }) }), _jsxs("div", { className: "p-2 border-t border-border space-y-1", children: [_jsx("button", { onClick: () => setSidebarExpanded(!sidebarExpanded), className: `hidden md:flex items-center mx-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${sidebarExpanded ? 'gap-3' : 'justify-center px-2'}`, title: sidebarExpanded ? '收起侧边栏' : '展开侧边栏', children: sidebarExpanded ? (_jsxs(_Fragment, { children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium whitespace-nowrap", children: "\u6536\u8D77" })] })) : (_jsx(ChevronRight, { className: "w-4 h-4" })) }), _jsxs("button", { onClick: logout, className: `flex items-center mx-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ${sidebarExpanded ? 'gap-3' : 'justify-center px-2'}`, title: "\u9000\u51FA\u767B\u5F55", children: [_jsx(LogOut, { className: "w-5 h-5 flex-shrink-0" }), sidebarExpanded && _jsx("span", { className: "text-sm font-medium whitespace-nowrap", children: "\u9000\u51FA\u767B\u5F55" })] })] })] }), _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsxs("header", { className: "h-16 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-30", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setSidebarOpen(true), className: "md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted", children: _jsx(Menu, { className: "w-5 h-5" }) }), _jsx("h1", { className: "text-sm font-semibold text-muted-foreground", children: "YuleTech \u793E\u533A\u7BA1\u7406\u540E\u53F0" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-bold", children: "A" }), _jsx("span", { className: "text-sm font-medium hidden sm:inline", children: "\u7BA1\u7406\u5458" })] }), _jsx("button", { onClick: logout, className: "p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors", title: "\u9000\u51FA\u767B\u5F55", children: _jsx(X, { className: "w-4 h-4" }) })] })] }), _jsx("main", { className: "flex-1 p-4 md:p-6 overflow-auto", children: _jsx(Outlet, {}) })] })] }));
}
