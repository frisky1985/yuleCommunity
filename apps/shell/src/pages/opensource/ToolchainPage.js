import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Wrench, Download, Settings, ChevronRight } from 'lucide-react';
export function ToolchainPage() {
    // 保留 state 以备后续使用
    const [, _setActiveTab] = useState('overview');
    const tools = [
        {
            id: 'config-gen',
            name: 'ConfigGenerator',
            desc: 'AutoSAR 配置生成工具',
            features: ['可视化配置', '代码生成', '校验检查'],
        },
        {
            id: 'debugger',
            name: 'yuleTrace',
            desc: '在线调试工具',
            features: ['实时追踪', '日志分析', '性能监控'],
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx("section", { className: "pt-24 pb-16 px-4", children: _jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6", children: [_jsx(Wrench, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "\u5F00\u53D1\u5DE5\u5177" })] }), _jsxs("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: ["\u5B8C\u6574\u7684 ", _jsx("span", { className: "text-[hsl(var(--accent))]", children: "\u5F00\u53D1\u5DE5\u5177\u94FE" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "\u63D0\u4F9B\u4ECE\u914D\u7F6E\u5230\u8C03\u8BD5\u7684\u5168\u6D41\u7A0B\u5DE5\u5177\u652F\u6301\uFF0C\u52A0\u901F AutoSAR \u5F00\u53D1\u6548\u7387" })] }) }), _jsx("section", { className: "py-16 px-4", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: tools.map((tool) => (_jsxs("div", { className: "p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center", children: _jsx(Settings, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: tool.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: tool.desc })] })] }), _jsx("ul", { className: "space-y-2 mb-4", children: tool.features.map((feature, idx) => (_jsxs("li", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(ChevronRight, { className: "w-4 h-4 text-[hsl(var(--accent))]" }), feature] }, idx))) }), _jsxs("button", { className: "w-full py-2 bg-muted rounded-lg text-sm font-medium hover:bg-[hsl(var(--accent))] hover:text-white transition-colors flex items-center justify-center gap-2", children: [_jsx(Download, { className: "w-4 h-4" }), "\u4E0B\u8F7D\u5DE5\u5177"] })] }, tool.id))) }) }) })] }));
}
