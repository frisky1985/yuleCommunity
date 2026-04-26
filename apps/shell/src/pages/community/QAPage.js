import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HelpCircle, MessageCircle, Check, ThumbsUp, Clock, Tag } from 'lucide-react';
export function QAPage() {
    const [filter, setFilter] = useState('all');
    const questions = [
        {
            id: 1,
            title: 'Port 驱动配置中的 Pin号映射问题',
            desc: '在配置 Port 驱动时，不确定如何正确映射引脚号到 PortPinId...',
            author: '新手小明',
            answers: 3,
            views: 89,
            solved: true,
            time: '3小时前',
            tags: ['MCAL', 'Port'],
        },
        {
            id: 2,
            title: 'CAN 通信数据丢失问题',
            desc: '在高负载情况下发现 CAN 消息丢失，请问是哪里配置错误...',
            author: '开发老李',
            answers: 5,
            views: 234,
            solved: false,
            time: '1天前',
            tags: ['Services', 'CAN'],
        },
    ];
    return (_jsx("div", { className: "min-h-screen bg-background pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "\u6280\u672F\u95EE\u7B54" }), _jsx("p", { className: "text-muted-foreground", children: "\u63D0\u51FA\u95EE\u9898\uFF0C\u83B7\u53D6\u793E\u533A\u4E13\u5BB6\u7684\u89E3\u7B54" })] }), _jsx("div", { className: "flex justify-center gap-2 mb-8", children: [
                        { id: 'all', label: '全部问题' },
                        { id: 'unsolved', label: '待解决' },
                        { id: 'solved', label: '已解决' },
                    ].map((f) => (_jsx("button", { onClick: () => setFilter(f.id), className: `px-4 py-2 rounded-lg font-medium transition-colors ${filter === f.id
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}`, children: f.label }, f.id))) }), _jsx("div", { className: "space-y-4 pb-16", children: questions.map((q) => (_jsx("div", { className: "p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs("div", { className: `w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${q.solved ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`, children: [q.solved ? _jsx(Check, { className: "w-6 h-6" }) : _jsx(HelpCircle, { className: "w-6 h-6" }), _jsx("span", { className: "text-xs mt-0.5", children: q.solved ? '已解决' : '待解决' })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-lg mb-2 hover:text-[hsl(var(--accent))] cursor-pointer", children: q.title }), _jsx("p", { className: "text-muted-foreground text-sm mb-3", children: q.desc }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm", children: [_jsx("div", { className: "flex gap-2", children: q.tags.map((tag) => (_jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent rounded", children: [_jsx(Tag, { className: "w-3 h-3" }), tag] }, tag))) }), _jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), q.time] })] })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), q.answers, " \u56DE\u7B54"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(ThumbsUp, { className: "w-4 h-4" }), q.views, " \u6D4F\u89C8"] })] })] }) }, q.id))) })] }) }));
}
