import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
export function BlogPage() {
    const [filter, setFilter] = useState('all');
    const articles = [
        {
            id: 1,
            title: 'AutoSAR 软件架构深度解析',
            excerpt: '本文深入剖析 AutoSAR Classic Platform 的软件分层架构，详细讲解从微控制器驱动层到运行时环境的完整数据流动路径...',
            author: '张工程师',
            date: '2026-04-20',
            readTime: '15 分钟',
            category: '架构',
        },
        {
            id: 2,
            title: 'yuleASR OS 模块实现原理',
            excerpt: '基于 FreeRTOS 的 AutoSAR OS 实现，讲解任务调度、事件通知和资源管理的具体实现...',
            author: '李架构师',
            date: '2026-04-15',
            readTime: '20 分钟',
            category: '模块开发',
        },
        {
            id: 3,
            title: '国产芯片移植经验分享',
            excerpt: '针对国产 MCU 的 MCAL 移植经验，包括时钟配置、中断处理和外设驱动适配...',
            author: '王移植专家',
            date: '2026-04-10',
            readTime: '25 分钟',
            category: '移植',
        },
    ];
    const categories = ['all', '架构', '模块开发', '移植'];
    const filteredArticles = filter === 'all'
        ? articles
        : articles.filter(a => a.category === filter);
    return (_jsx("div", { className: "min-h-screen bg-background pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "\u6280\u672F\u535A\u5BA2" }), _jsx("p", { className: "text-muted-foreground", children: "\u6DF1\u5EA6\u6280\u672F\u6587\u7AE0\uFF0C\u5206\u4EAB\u6C7D\u8F66\u8F6F\u4EF6\u5F00\u53D1\u7ECF\u9A8C" })] }), _jsx("div", { className: "flex justify-center gap-2 mb-8", children: categories.map(cat => (_jsx("button", { onClick: () => setFilter(cat), className: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}`, children: cat === 'all' ? '全部' : cat }, cat))) }), _jsx("div", { className: "grid gap-6 pb-16", children: filteredArticles.map((article) => (_jsxs("article", { className: "p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mb-3", children: [_jsx("span", { className: "px-2 py-1 bg-accent/10 text-accent rounded", children: article.category }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), article.date] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4" }), article.readTime] })] }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: article.title }), _jsx("p", { className: "text-muted-foreground mb-4", children: article.excerpt }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(User, { className: "w-4 h-4" }), article.author] }), _jsxs("button", { className: "flex items-center gap-1 text-[hsl(var(--accent))] font-medium hover:underline", children: ["\u9605\u8BFB\u5168\u6587", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] }, article.id))) })] }) }));
}
