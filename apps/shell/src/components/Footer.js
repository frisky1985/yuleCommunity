import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Code2, GitBranch, MessageCircle, Mail, MapPin } from 'lucide-react';
const footerLinks = {
    平台: [
        { label: '开源代码', href: '/opensource' },
        { label: '工具链', href: '/toolchain' },
        { label: '开发板', href: '#' },
        { label: '插件市场', href: '#' },
    ],
    学习: [
        { label: 'AutoSAR 教程', href: '/learning' },
        { label: '视频课程', href: '/learning' },
        { label: '技术博客', href: '/blog' },
        { label: '文档中心', href: '/docs' },
    ],
    合作: [
        { label: '芯片厂商合作', href: '#' },
        { label: '工具开发商', href: '#' },
        { label: '企业客户', href: '#' },
        { label: '渠道代理', href: '#' },
    ],
    关于: [
        { label: '关于我们', href: '#' },
        { label: '加入团队', href: '#' },
        { label: '联系我们', href: '#' },
        { label: '隐私政策', href: '#' },
    ],
};
export function Footer() {
    return (_jsx("footer", { className: "bg-muted/50 border-t border-border", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-8", children: [_jsxs("div", { className: "col-span-2", children: [_jsxs("a", { href: "#", className: "flex items-center gap-2 mb-4", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center", children: _jsx(Code2, { className: "w-5 h-5 text-white" }) }), _jsxs("span", { className: "font-bold text-lg", children: ["Yule", _jsx("span", { className: "text-[hsl(var(--accent))]", children: "Tech" })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs", children: "\u56FD\u5185\u9886\u5148\u7684\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u5F00\u6E90\u793E\u533A\uFF0C\u4E3A\u5DE5\u7A0B\u5E08\u63D0\u4F9B AutoSAR BSW \u5F00\u6E90\u4EE3\u7801\u548C\u5F00\u53D1\u5DE5\u5177\u94FE\u3002" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("a", { href: "#", className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors", children: _jsx(GitBranch, { className: "w-4 h-4" }) }), _jsx("a", { href: "#", className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors", children: _jsx(MessageCircle, { className: "w-4 h-4" }) }), _jsx("a", { href: "#", className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors", children: _jsx(Mail, { className: "w-4 h-4" }) })] })] }), Object.entries(footerLinks).map(([category, links]) => (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-sm mb-4", children: category }), _jsx("ul", { className: "space-y-2", children: links.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: link.label }) }, link.label))) })] }, category)))] }), _jsxs("div", { className: "mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(MapPin, { className: "w-4 h-4" }), "\u4E0A\u6D77\u4E88\u4E50\u7535\u5B50\u79D1\u6280\u6709\u9650\u516C\u53F8"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u00A9 2026 YuleTech. \u4FDD\u7559\u6240\u6709\u6743\u5229\u3002" })] })] }) }));
}
