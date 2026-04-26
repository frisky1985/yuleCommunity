import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, Users, Lightbulb, ArrowRight, MapPin, Clock, Flame, ChevronRight, Heart, MessageSquare, Star, Award, HelpCircle, Video, PieChart, Activity, } from 'lucide-react';
const forumTopics = [
    {
        title: 'i.MX8M Mini 上 CAN FD 的波特率配置问题',
        author: '张明',
        avatar: 'ZM',
        role: '嵌入式工程师',
        replies: 24,
        likes: 18,
        tags: ['MCAL', 'CAN', 'i.MX8M'],
        time: '2小时前',
        hot: true,
    },
    {
        title: 'AutoSAR Com 模块的信号路由配置最佳实践',
        author: '李华',
        avatar: 'LH',
        role: '软件架构师',
        replies: 36,
        likes: 42,
        tags: ['Service', 'Com', '配置'],
        time: '5小时前',
        hot: true,
    },
    {
        title: '求助：Pwm 模块在 i.MX8M 上的占空比精度问题',
        author: '王强',
        avatar: 'WQ',
        role: '初级工程师',
        replies: 12,
        likes: 8,
        tags: ['MCAL', 'Pwm'],
        time: '昨天',
        hot: false,
    },
    {
        title: '分享：我们团队基于 YuleTech BSW 的量产经验',
        author: '陈工',
        avatar: 'CG',
        role: '技术负责人',
        replies: 58,
        likes: 89,
        tags: ['经验分享', '量产'],
        time: '2天前',
        hot: true,
    },
    {
        title: 'YuleConfig 工具链的 Docker 环境搭建踩坑记录',
        author: '刘洋',
        avatar: 'LY',
        role: 'DevOps工程师',
        replies: 15,
        likes: 22,
        tags: ['工具链', 'Docker'],
        time: '3天前',
        hot: false,
    },
];
const events = [
    {
        title: 'AutoSAR BSW 开源社区线上技术沙龙',
        date: '2026-04-25',
        time: '20:00 - 21:30',
        type: '线上',
        location: '腾讯会议',
        attendees: 156,
        status: '报名中',
    },
    {
        title: 'YuleTech 首届汽车基础软件黑客松',
        date: '2026-05-10',
        time: '09:00 - 18:00',
        type: '线下',
        location: '上海张江高科',
        attendees: 80,
        status: '报名中',
    },
    {
        title: 'i.MX8M Mini 驱动开发实战工作坊',
        date: '2026-05-18',
        time: '14:00 - 17:00',
        type: '线上',
        location: 'B站直播',
        attendees: 320,
        status: '即将开始',
    },
    {
        title: 'AutoSAR 功能安全与 ISO 26262 研讨会',
        date: '2026-06-05',
        time: '09:30 - 16:30',
        type: '线下',
        location: '深圳南山科技园',
        attendees: 120,
        status: '报名中',
    },
];
const circles = [
    {
        name: 'MCAL 驱动开发圈',
        members: 480,
        posts: 1200,
        desc: '专注微控制器驱动层开发技术交流',
        icon: CpuIcon,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        name: 'ECUAL 抽象层圈',
        members: 360,
        posts: 890,
        desc: 'ECU硬件抽象层配置与开发讨论',
        icon: LayersIcon,
        color: 'from-cyan-500 to-teal-500',
    },
    {
        name: 'i.MX8M Mini 开发者圈',
        members: 620,
        posts: 2100,
        desc: 'NXP i.MX8M Mini 芯片开发技术交流',
        icon: ChipIcon,
        color: 'from-teal-500 to-emerald-500',
    },
    {
        name: '功能安全圈',
        members: 210,
        posts: 560,
        desc: 'ISO 26262 功能安全标准实践交流',
        icon: ShieldIcon,
        color: 'from-emerald-500 to-green-500',
    },
];
const tasks = [
    {
        title: '为 CanIf 模块补充完整的 Doxygen 文档',
        reward: '500 积分',
        difficulty: '简单',
        deadline: '2026-05-01',
        applicants: 3,
        tags: ['文档', 'ECUAL'],
    },
    {
        title: '实现 i.MX8M Mini 的 Adc 模块 DMA 传输支持',
        reward: '2000 积分',
        difficulty: '困难',
        deadline: '2026-05-15',
        applicants: 1,
        tags: ['MCAL', 'Adc', 'DMA'],
    },
    {
        title: '开发 YuleConfig 的 DBC 文件导入插件',
        reward: '3000 积分 + 现金奖励',
        difficulty: '中等',
        deadline: '2026-05-20',
        applicants: 5,
        tags: ['工具链', '插件'],
    },
    {
        title: '编写 AutoSAR 入门系列博客文章（5篇）',
        reward: '1500 积分',
        difficulty: '简单',
        deadline: '2026-04-30',
        applicants: 8,
        tags: ['内容创作', '入门'],
    },
];
function CpuIcon(props) {
    return (_jsxs("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }), _jsx("rect", { x: "9", y: "9", width: "6", height: "6" }), _jsx("path", { d: "M15 2v2" }), _jsx("path", { d: "M15 20v2" }), _jsx("path", { d: "M2 15h2" }), _jsx("path", { d: "M2 9h2" }), _jsx("path", { d: "M20 15h2" }), _jsx("path", { d: "M20 9h2" }), _jsx("path", { d: "M9 2v2" }), _jsx("path", { d: "M9 20v2" })] }));
}
function LayersIcon(props) {
    return (_jsxs("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }), _jsx("polyline", { points: "2 17 12 22 22 17" }), _jsx("polyline", { points: "2 12 12 17 22 12" })] }));
}
function ChipIcon(props) {
    return (_jsxs("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M18 12h2" }), _jsx("path", { d: "M4 12h2" }), _jsx("path", { d: "M12 18v2" }), _jsx("path", { d: "M12 4v2" }), _jsx("path", { d: "M8 8l-2-2" }), _jsx("path", { d: "M16 16l2 2" }), _jsx("path", { d: "M8 16l-2 2" }), _jsx("path", { d: "M16 8l2-2" }), _jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" })] }));
}
function ShieldIcon(props) {
    return (_jsx("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) }));
}
const tabs = [
    { id: 'forum', label: '技术论坛', icon: MessageCircle },
    { id: 'events', label: '活动日历', icon: Calendar },
    { id: 'circles', label: '工程师圈子', icon: Users },
    { id: 'tasks', label: '众包任务', icon: Lightbulb },
];
export function CommunityPage() {
    const [activeTab, setActiveTab] = useState('forum');
    return (_jsxs("div", { className: "min-h-screen pt-16", children: [_jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [_jsx(Users, { className: "w-4 h-4" }), "\u5DE5\u7A0B\u5E08\u793E\u533A"] }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["\u4E0E\u5DE5\u7A0B\u5E08", _jsx("span", { className: "text-gradient-accent", children: " \u5171\u540C\u6210\u957F" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u52A0\u5165 YuleTech \u793E\u533A\uFF0C\u4E0E 2,800+ \u6C7D\u8F66\u8F6F\u4EF6\u5DE5\u7A0B\u5E08\u4E00\u8D77\u4EA4\u6D41\u5B66\u4E60\u3001\u534F\u4F5C\u5F00\u53D1\u3002 \u6280\u672F\u8BBA\u575B\u3001\u6D3B\u52A8\u6C99\u9F99\u3001\u5DE5\u7A0B\u5E08\u5708\u5B50\u3001\u4F17\u5305\u4EFB\u52A1\uFF0C\u8FD9\u91CC\u662F\u4F60\u6280\u672F\u6210\u957F\u7684\u6C83\u571F\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: ["\u514D\u8D39\u52A0\u5165\u793E\u533A", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), _jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), "\u6D4F\u89C8\u8BA8\u8BBA"] })] })] }) }) }), _jsx("section", { className: "py-8 border-y border-border bg-card/30", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "2,800+" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u6CE8\u518C\u5DE5\u7A0B\u5E08" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "4,500+" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u6280\u672F\u8BA8\u8BBA" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "12" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u6D3B\u8DC3\u5708\u5B50" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "50+" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5F00\u653E\u4EFB\u52A1" })] })] }) }) }), _jsx("section", { className: "py-10 border-y border-border bg-card/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(Activity, { className: "w-5 h-5 text-[hsl(var(--accent))]" }), _jsx("h2", { className: "text-xl font-bold", children: "\u793E\u533A\u6570\u636E\u6982\u89C8" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(PieChart, { className: "w-4 h-4 text-[hsl(var(--accent))]" }), _jsx("h3", { className: "font-semibold", children: "\u5185\u5BB9\u7C7B\u578B\u5206\u5E03" })] }), _jsx("div", { className: "h-64 flex items-center justify-center text-muted-foreground", children: _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-cyan-500" }), _jsx("span", { children: "\u8BBA\u575B\u5E16\u5B50 (45%)" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-emerald-500" }), _jsx("span", { children: "\u95EE\u7B54\u95EE\u9898 (30%)" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-amber-500" }), _jsx("span", { children: "\u793E\u533A\u6D3B\u52A8 (15%)" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-rose-500" }), _jsx("span", { children: "\u535A\u5BA2\u6587\u7AE0 (10%)" })] })] }) })] }), _jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Activity, { className: "w-4 h-4 text-[hsl(var(--accent))]" }), _jsx("h3", { className: "font-semibold", children: "\u8FD114\u5929\u6D3B\u8DC3\u5EA6" })] }), _jsx("div", { className: "h-64 flex items-end justify-between gap-2 px-4", children: [45, 52, 38, 65, 48, 72, 58, 60, 55, 68, 75, 62, 80, 70].map((h, i) => (_jsx("div", { className: "w-full bg-[hsl(var(--accent))]/20 rounded-t", style: { height: `${h}%` }, children: _jsx("div", { className: "w-full bg-[hsl(var(--accent))] rounded-t transition-all", style: { height: '100%' } }) }, i))) })] })] })] }) }), _jsx("section", { className: "py-10", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Link, { to: "/forum", className: "group bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--accent))]/30 hover:shadow-elegant transition-all", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0", children: _jsx(MessageSquare, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold group-hover:text-[hsl(var(--accent))] transition-colors", children: "\u6280\u672F\u8BBA\u575B" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u53D1\u5E16\u8BA8\u8BBA\u3001\u5206\u4EAB\u7ECF\u9A8C\u3001\u6C42\u52A9\u7B54\u7591" })] }), _jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors" })] }) }), _jsx(Link, { to: "/qa", className: "group bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--accent))]/30 hover:shadow-elegant transition-all", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0", children: _jsx(HelpCircle, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold group-hover:text-[hsl(var(--accent))] transition-colors", children: "\u6280\u672F\u95EE\u7B54" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u60AC\u8D4F\u63D0\u95EE\u3001\u4E13\u5BB6\u89E3\u7B54\u3001\u79EF\u7D2F\u77E5\u8BC6" })] }), _jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors" })] }) }), _jsx(Link, { to: "/events", className: "group bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--accent))]/30 hover:shadow-elegant transition-all", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0", children: _jsx(Video, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold group-hover:text-[hsl(var(--accent))] transition-colors", children: "\u793E\u533A\u6D3B\u52A8" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u7EBF\u4E0A\u6C99\u9F99\u3001\u7EBF\u4E0B\u7814\u8BA8\u3001\u5B9E\u6218\u8BAD\u7EC3\u8425" })] }), _jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors" })] }) })] }) }) }), _jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: tabs.map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: [_jsx(tab.icon, { className: "w-4 h-4" }), tab.label] }, tab.id))) }) }) }), _jsx("section", { className: "py-12 min-h-[600px]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [activeTab === 'forum' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold", children: "\u70ED\u95E8\u8BA8\u8BBA" }), _jsxs("button", { className: "text-sm text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-glow))] font-medium flex items-center gap-1", children: ["\u53D1\u8D77\u8BA8\u8BBA ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] }), forumTopics.map((topic) => (_jsx("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-sm font-bold flex-shrink-0", children: topic.avatar }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold group-hover:text-[hsl(var(--accent))] transition-colors truncate", children: topic.title }), topic.hot && (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full flex-shrink-0", children: [_jsx(Flame, { className: "w-3 h-3" }), " \u70ED\u95E8"] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-3", children: [_jsx("span", { className: "font-medium text-foreground", children: topic.author }), _jsx("span", { children: "\u00B7" }), _jsx("span", { children: topic.role }), _jsx("span", { children: "\u00B7" }), _jsx("span", { children: topic.time })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex flex-wrap gap-1.5", children: topic.tags.map((tag) => (_jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center gap-4 ml-auto text-xs text-muted-foreground flex-shrink-0", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "w-3.5 h-3.5" }), " ", topic.replies] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Heart, { className: "w-3.5 h-3.5" }), " ", topic.likes] })] })] })] })] }) }, topic.title)))] })), activeTab === 'events' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold", children: "\u8FD1\u671F\u6D3B\u52A8" }), _jsxs("button", { className: "text-sm text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-glow))] font-medium flex items-center gap-1", children: ["\u67E5\u770B\u5168\u90E8 ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: events.map((event) => (_jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${event.type === '线上'
                                                            ? 'bg-blue-500/10 text-blue-500'
                                                            : 'bg-emerald-500/10 text-emerald-500'}`, children: event.type }), _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${event.status === '报名中'
                                                            ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]'
                                                            : 'bg-amber-500/10 text-amber-500'}`, children: event.status })] }), _jsx("h3", { className: "font-semibold mb-3 group-hover:text-[hsl(var(--accent))] transition-colors", children: event.title }), _jsxs("div", { className: "space-y-2 text-sm text-muted-foreground mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { children: event.date })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsx("span", { children: event.time })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsx("span", { children: event.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4" }), _jsxs("span", { children: ["\u5DF2\u62A5\u540D ", event.attendees, " \u4EBA"] })] })] }), _jsx("button", { className: "w-full py-2.5 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: "\u7ACB\u5373\u62A5\u540D" })] }, event.title))) })] })), activeTab === 'circles' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold", children: "\u5DE5\u7A0B\u5E08\u5708\u5B50" }), _jsxs("button", { className: "text-sm text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-glow))] font-medium flex items-center gap-1", children: ["\u521B\u5EFA\u5708\u5B50 ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: circles.map((circle) => (_jsx("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${circle.color} flex items-center justify-center flex-shrink-0`, children: _jsx(circle.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold mb-1", children: circle.name }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: circle.desc }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3.5 h-3.5" }), " ", circle.members, " \u6210\u5458"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "w-3.5 h-3.5" }), " ", circle.posts, " \u5E16\u5B50"] })] })] }), _jsx("button", { className: "px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-medium hover:bg-[hsl(var(--primary))] hover:text-primary-foreground transition-colors border border-border flex-shrink-0", children: "\u52A0\u5165" })] }) }, circle.name))) })] })), activeTab === 'tasks' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-bold", children: "\u4F17\u5305\u4EFB\u52A1" }), _jsxs("button", { className: "text-sm text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-glow))] font-medium flex items-center gap-1", children: ["\u53D1\u5E03\u4EFB\u52A1 ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: tasks.map((task) => (_jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("h3", { className: "font-semibold group-hover:text-[hsl(var(--accent))] transition-colors", children: task.title }), _jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2", children: [_jsx(Award, { className: "w-3 h-3" }), " ", task.reward] })] }), _jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: task.tags.map((tag) => (_jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center gap-4 text-muted-foreground", children: [_jsxs("span", { className: `flex items-center gap-1 ${task.difficulty === '简单'
                                                                    ? 'text-emerald-500'
                                                                    : task.difficulty === '中等'
                                                                        ? 'text-amber-500'
                                                                        : 'text-red-500'}`, children: [_jsx(Star, { className: "w-3.5 h-3.5" }), " ", task.difficulty] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3.5 h-3.5" }), " ", task.deadline, " \u622A\u6B62"] })] }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [task.applicants, " \u4EBA\u7533\u8BF7"] })] }), _jsx("button", { className: "w-full mt-4 py-2.5 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: "\u7533\u8BF7\u4EFB\u52A1" })] }, task.title))) })] }))] }) }), _jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u52A0\u5165 YuleTech \u793E\u533A" }), _jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u65E0\u8BBA\u4F60\u662F\u521A\u5165\u95E8\u7684\u7231\u597D\u8005\uFF0C\u8FD8\u662F\u7ECF\u9A8C\u4E30\u5BCC\u7684\u4E13\u5BB6\uFF0CYuleTech \u793E\u533A\u90FD\u4E3A\u4F60\u51C6\u5907\u4E86\u5408\u9002\u7684\u4F4D\u7F6E\u3002 \u4E0E 2,800+ \u5DE5\u7A0B\u5E08\u4E00\u8D77\uFF0C\u4E3A\u4E2D\u56FD\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u5F00\u6E90\u751F\u6001\u8D21\u732E\u529B\u91CF\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u514D\u8D39\u6CE8\u518C" }), _jsx("button", { className: "px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20", children: "\u4E86\u89E3\u793E\u533A\u89C4\u5219" })] })] }) })] }));
}
