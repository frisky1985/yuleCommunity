import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const stats = [
        { label: '总用户数', value: '2,847', change: '+12%', icon: Users },
        { label: '文章数量', value: '156', change: '+5%', icon: FileText },
        { label: '话题讨论', value: '342', change: '+18%', icon: Activity },
        { label: '日活跃用户', value: '892', change: '+8%', icon: TrendingUp },
    ];
    return (_jsx("div", { className: "min-h-screen bg-background", children: _jsxs("div", { className: "flex", children: [_jsxs("aside", { className: "w-64 bg-card border-r border-border min-h-screen p-4", children: [_jsxs("div", { className: "flex items-center gap-2 px-4 py-4 mb-8", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-sm", children: "Y" }) }), _jsx("span", { className: "font-bold", children: "YuleTech \u7BA1\u7406" })] }), _jsx("nav", { className: "space-y-2", children: [
                                { id: 'overview', label: '总览', icon: LayoutDashboard },
                                { id: 'users', label: '用户管理', icon: Users },
                                { id: 'content', label: '内容管理', icon: FileText },
                                { id: 'settings', label: '系统设置', icon: Settings },
                            ].map((item) => (_jsxs("button", { onClick: () => setActiveTab(item.id), className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                    ? 'bg-[hsl(var(--accent))] text-white'
                                    : 'text-muted-foreground hover:bg-muted'}`, children: [_jsx(item.icon, { className: "w-5 h-5" }), item.label] }, item.id))) }), _jsx("div", { className: "mt-auto pt-8", children: _jsxs(Link, { to: "/admin/login", className: "w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg transition-colors", children: [_jsx(LogOut, { className: "w-5 h-5" }), "\u9000\u51FA\u767B\u5F55"] }) })] }), _jsxs("main", { className: "flex-1 p-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\u7BA1\u7406\u540E\u53F0" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "\u7BA1\u7406\u5458" }), _jsx("div", { className: "w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center", children: _jsx("span", { className: "font-bold text-sm", children: "A" }) })] })] }), _jsx("div", { className: "grid md:grid-cols-4 gap-6 mb-8", children: stats.map((stat) => (_jsxs("div", { className: "p-6 bg-card rounded-xl border border-border", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(stat.icon, { className: "w-5 h-5 text-muted-foreground" }), _jsx("span", { className: "text-sm text-green-500", children: stat.change })] }), _jsx("div", { className: "text-2xl font-bold", children: stat.value }), _jsx("div", { className: "text-sm text-muted-foreground", children: stat.label })] }, stat.label))) }), _jsxs("div", { className: "bg-card rounded-xl border border-border p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "\u6700\u8FD1\u6D3B\u52A8" }), _jsx("div", { className: "space-y-4", children: [
                                        { action: '新用户注册', user: '小王', time: '2分钟前' },
                                        { action: '发布文章', user: '张老师', time: '15分钟前' },
                                        { action: '回复话题', user: '李工程师', time: '30分钟前' },
                                    ].map((activity, idx) => (_jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border last:border-0", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: activity.action }), _jsxs("span", { className: "text-muted-foreground", children: [" - ", activity.user] })] }), _jsx("span", { className: "text-sm text-muted-foreground", children: activity.time })] }, idx))) })] })] })] }) }));
}
