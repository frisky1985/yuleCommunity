import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
export function EventsPage() {
    const [filter, setFilter] = useState('upcoming');
    const events = [
        {
            id: 1,
            title: 'YuleTech 线下技术沙龙',
            type: 'offline',
            date: '2026-05-15',
            time: '14:00-17:00',
            location: '上海市浦东新区',
            participants: 45,
            maxParticipants: 50,
            status: 'registering',
        },
        {
            id: 2,
            title: 'AutoSAR 基础入门在线课堂',
            type: 'online',
            date: '2026-04-30',
            time: '20:00-21:30',
            location: '腾讯会议',
            participants: 156,
            maxParticipants: 200,
            status: 'registering',
        },
        {
            id: 3,
            title: 'yuleASR v2.0 发布会',
            type: 'online',
            date: '2026-04-20',
            time: '19:00-20:30',
            location: 'B 站直播',
            participants: 89,
            maxParticipants: 500,
            status: 'ended',
        },
    ];
    const filteredEvents = events.filter((e) => {
        if (filter === 'upcoming')
            return e.status === 'registering';
        if (filter === 'ended')
            return e.status === 'ended';
        return true;
    });
    return (_jsx("div", { className: "min-h-screen bg-background pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "\u793E\u533A\u6D3B\u52A8" }), _jsx("p", { className: "text-muted-foreground", children: "\u7EBF\u4E0A\u7EBF\u4E0B\u6280\u672F\u6D3B\u52A8\uFF0C\u5B66\u4E60\u4EA4\u6D41\u6210\u957F" })] }), _jsx("div", { className: "flex justify-center gap-2 mb-8", children: [
                        { id: 'upcoming', label: '即将举行' },
                        { id: 'all', label: '全部活动' },
                        { id: 'ended', label: '已结束' },
                    ].map((f) => (_jsx("button", { onClick: () => setFilter(f.id), className: `px-4 py-2 rounded-lg font-medium transition-colors ${filter === f.id
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}`, children: f.label }, f.id))) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16", children: filteredEvents.map((event) => (_jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden hover:border-[hsl(var(--accent))] transition-colors", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: `px-2 py-1 text-xs rounded-full ${event.type === 'online' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`, children: event.type === 'online' ? '线上活动' : '线下活动' }), event.status === 'ended' && (_jsx("span", { className: "px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground", children: "\u5DF2\u7ED3\u675F" }))] }), _jsx("h3", { className: "text-lg font-semibold mb-4", children: event.title }), _jsxs("div", { className: "space-y-2 text-sm text-muted-foreground mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), event.date] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), event.time] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4" }), event.location] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4" }), event.participants, "/", event.maxParticipants, " \u4EBA\u53C2\u52A0"] })] }), _jsxs("button", { className: `w-full py-2 rounded-lg font-medium flex items-center justify-center gap-1 ${event.status === 'ended'
                                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                        : 'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent))]/90'}`, children: [event.status === 'ended' ? '查看回顾' : '立即报名', _jsx(ChevronRight, { className: "w-4 h-4" })] })] }) }, event.id))) })] }) }));
}
