import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MessageSquare, Eye, Plus, Clock, Tag } from 'lucide-react';
export function ForumPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const categories = [
        { id: 'all', name: '全部', count: 156 },
        { id: 'mcal', name: 'MCAL', count: 45 },
        { id: 'ecual', name: 'ECUAL', count: 38 },
        { id: 'services', name: 'Services', count: 42 },
        { id: 'tools', name: '工具', count: 31 },
    ];
    const topics = [
        {
            id: 1,
            title: 'Port 驱动配置疑问',
            author: '新人小王',
            replies: 12,
            views: 234,
            time: '2小时前',
            tags: ['MCAL', 'Port'],
            hot: true,
        },
        {
            id: 2,
            title: '分享：我们团队的 CAN 通信优化经验',
            author: '老驾驶员',
            replies: 28,
            views: 567,
            time: '5小时前',
            tags: ['Services', 'CAN'],
            hot: true,
        },
        {
            id: 3,
            title: 'yuleASR 配置工具怎么使用？',
            author: '学习者',
            replies: 8,
            views: 156,
            time: '1天前',
            tags: ['工具'],
            hot: false,
        },
    ];
    return (_jsx("div", { className: "min-h-screen bg-background pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-3xl font-bold", children: "\u6280\u672F\u8BBA\u575B" }), _jsxs("button", { className: "px-4 py-2 bg-[hsl(var(--accent))] text-white rounded-lg flex items-center gap-2 hover:bg-[hsl(var(--accent))]/90", children: [_jsx(Plus, { className: "w-4 h-4" }), "\u53D1\u5E03\u8BDD\u9898"] })] }), _jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: categories.map((cat) => (_jsxs("button", { onClick: () => setActiveCategory(cat.id), className: `px-4 py-2 rounded-lg font-medium transition-colors ${activeCategory === cat.id
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}`, children: [cat.name, " (", cat.count, ")"] }, cat.id))) }), _jsx("div", { className: "space-y-4 pb-16", children: topics.map((topic) => (_jsx("div", { className: "p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0", children: _jsx(MessageSquare, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [topic.hot && (_jsx("span", { className: "px-2 py-0.5 bg-red-500/10 text-red-500 text-xs rounded-full", children: "\u70ED\u95E8" })), _jsx("h3", { className: "font-semibold hover:text-[hsl(var(--accent))] cursor-pointer", children: topic.title })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [_jsx("span", { children: topic.author }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), topic.time] }), _jsx("div", { className: "flex gap-2", children: topic.tags.map((tag) => (_jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-muted rounded", children: [_jsx(Tag, { className: "w-3 h-3" }), tag] }, tag))) })] })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), topic.replies] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-4 h-4" }), topic.views] })] })] }) }, topic.id))) })] }) }));
}
