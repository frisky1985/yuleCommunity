import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search, FileText } from 'lucide-react';
import { useState } from 'react';
export function DocsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const docs = [
        { title: '快速入门指南', category: '开始', desc: '5分钟了解 yuleASR 项目结构和开发环境搭建' },
        { title: 'AutoSAR 架构概览', category: '架构', desc: '深入理解 AutoSAR 分层架构和模块交互' },
        { title: 'MCAL 开发指南', category: 'MCAL', desc: '微控制器驱动开发的完整文档' },
        { title: 'ECUAL 开发指南', category: 'ECUAL', desc: 'ECU 抽象层驱动开发说明' },
    ];
    return (_jsx("div", { className: "min-h-screen bg-background pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "\u6587\u6863\u4E2D\u5FC3" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "\u5B8C\u6574\u7684 API \u6587\u6863\u3001\u5F00\u53D1\u6307\u5357\u548C\u6559\u7A0B" }), _jsxs("div", { className: "max-w-xl mx-auto relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6587\u6863...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-[hsl(var(--accent))]" })] })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-6 pb-16", children: docs.map((doc) => (_jsx("div", { className: "p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center", children: _jsx(FileText, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("span", { className: "text-xs text-[hsl(var(--accent))] font-medium", children: doc.category }), _jsx("h3", { className: "text-lg font-semibold mt-1 mb-2", children: doc.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: doc.desc })] })] }) }, doc.title))) })] }) }));
}
