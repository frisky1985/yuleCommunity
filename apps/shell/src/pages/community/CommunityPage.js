import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
export function CommunityPage() {
    const stats = [
        { label: '注册用户', value: '2,800+', icon: Users },
        { label: '话题讨论', value: '1,500+', icon: MessageSquare },
        { label: '活动举办', value: '50+', icon: Calendar },
        { label: '贡献者', value: '120+', icon: TrendingUp },
    ];
    const topics = [
        { title: 'AutoSAR 配置工具使用问题', replies: 32, views: 456 },
        { title: 'MCAL Port 驱动移植经验分享', replies: 28, views: 389 },
        { title: 'CAN 通信协议实现疑问', replies: 45, views: 567 },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx("section", { className: "pt-24 pb-16 px-4", children: _jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6", children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "\u6280\u672F\u793E\u533A" })] }), _jsxs("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: ["\u52A0\u5165 ", _jsx("span", { className: "text-[hsl(var(--accent))]", children: "YuleTech" }), " \u793E\u533A"] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "\u4E0E 2,800+ \u6C7D\u8F66\u8F6F\u4EF6\u5DE5\u7A0B\u5E08\u4EA4\u6D41\u5B66\u4E60\u3001\u5206\u4EAB\u7ECF\u9A8C\u3001\u534F\u4F5C\u5F00\u53D1" })] }) }), _jsx("section", { className: "py-8 px-4", children: _jsx("div", { className: "max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4", children: stats.map((stat) => (_jsxs("div", { className: "p-6 bg-card rounded-xl border border-border text-center", children: [_jsx(stat.icon, { className: "w-8 h-8 text-[hsl(var(--accent))] mx-auto mb-3" }), _jsx("div", { className: "text-2xl font-bold", children: stat.value }), _jsx("div", { className: "text-sm text-muted-foreground", children: stat.label })] }, stat.label))) }) }), _jsx("section", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "\u70ED\u95E8\u8BDD\u9898" }), _jsx("div", { className: "space-y-4", children: topics.map((topic, idx) => (_jsxs("div", { className: "p-4 bg-card rounded-lg border border-border hover:border-[hsl(var(--accent))] transition-colors", children: [_jsx("h3", { className: "font-medium mb-2", children: topic.title }), _jsxs("div", { className: "flex gap-4 text-sm text-muted-foreground", children: [_jsxs("span", { children: [topic.replies, " \u56DE\u590D"] }), _jsxs("span", { children: [topic.views, " \u6D4F\u89C8"] })] })] }, idx))) })] }) })] }));
}
