import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BookOpen, Play, Code2, MessageSquare, Clock, Users, Star, ArrowRight, CheckCircle2, Lock, Award, GraduationCap, Lightbulb, } from 'lucide-react';
const categories = ['全部', '教程', '视频课程', '实战项目', '专家问答'];
const courses = [
    {
        category: '教程',
        icon: BookOpen,
        color: 'text-blue-500 bg-blue-500/10',
        items: [
            {
                title: 'AutoSAR Classic Platform 4.x 规范解读',
                desc: '从入门到精通，系统讲解 AutoSAR 方法论、软件架构和配置流程。包含 12 章完整内容。',
                level: '入门',
                duration: '24 课时',
                students: 1840,
                rating: 4.9,
                free: true,
                tags: ['AutoSAR', '规范'],
            },
            {
                title: 'MCAL 驱动开发实战指南',
                desc: '深入讲解 MCAL 层驱动开发原理，基于 i.MX8M Mini 芯片的寄存器配置和代码实现。',
                level: '进阶',
                duration: '18 课时',
                students: 920,
                rating: 4.8,
                free: true,
                tags: ['MCAL', 'i.MX8M'],
            },
            {
                title: '汽车功能安全 ISO 26262 基础',
                desc: '功能安全标准解读，ASIL 等级划分，安全分析方法在汽车基础软件中的应用。',
                level: '中级',
                duration: '12 课时',
                students: 650,
                rating: 4.7,
                free: false,
                tags: ['功能安全', 'ISO 26262'],
            },
        ],
    },
    {
        category: '视频课程',
        icon: Play,
        color: 'text-cyan-500 bg-cyan-500/10',
        items: [
            {
                title: 'AutoSAR BSW 配置工具链实操',
                desc: '手把手演示 YuleConfig 工具的使用，从新建工程到生成代码的完整流程录制。',
                level: '入门',
                duration: '8 课时',
                students: 2100,
                rating: 4.9,
                free: true,
                tags: ['工具链', '实操'],
            },
            {
                title: 'CAN 通信协议栈深度解析',
                desc: '从物理层到应用层，全面解析 CAN/CAN FD 通信协议栈在 AutoSAR 中的实现机制。',
                level: '进阶',
                duration: '15 课时',
                students: 1100,
                rating: 4.8,
                free: true,
                tags: ['CAN', '通信'],
            },
            {
                title: '诊断服务 UDS 开发精讲',
                desc: 'UDS 协议(ISO 14229)详解，Dcm/Dem 模块配置与诊断服务实现。',
                level: '高级',
                duration: '20 课时',
                students: 780,
                rating: 4.9,
                free: false,
                tags: ['UDS', '诊断'],
            },
        ],
    },
    {
        category: '实战项目',
        icon: Code2,
        color: 'text-teal-500 bg-teal-500/10',
        items: [
            {
                title: 'i.MX8M Mini 开发板入门项目',
                desc: '基于 YuleTech 开源开发板，完成 GPIO 控制、CAN 收发和 ADC 采集的完整项目。',
                level: '入门',
                duration: '10 课时',
                students: 1560,
                rating: 4.8,
                free: true,
                tags: ['开发板', '实战'],
            },
            {
                title: '车身控制器 BSW 全栈开发',
                desc: '从零开始搭建车身控制器的完整 BSW 栈，包含 MCAL/ECUAL/Service 三层实现。',
                level: '进阶',
                duration: '30 课时',
                students: 890,
                rating: 4.9,
                free: false,
                tags: ['BCM', '全栈'],
            },
            {
                title: '电机控制 ASW 组件开发',
                desc: '基于 Simulink 模型自动生成代码，集成到 RTE 层，实现电机控制应用层开发。',
                level: '高级',
                duration: '25 课时',
                students: 560,
                rating: 4.7,
                free: false,
                tags: ['电机控制', 'MBD'],
            },
        ],
    },
    {
        category: '专家问答',
        icon: MessageSquare,
        color: 'text-emerald-500 bg-emerald-500/10',
        items: [
            {
                title: 'AutoSAR 配置常见问题 100 问',
                desc: '汇总社区高频问题，由资深工程师详细解答配置、编译和调试中的常见难题。',
                level: '全阶段',
                duration: '持续更新',
                students: 3200,
                rating: 4.9,
                free: true,
                tags: ['FAQ', '答疑'],
            },
            {
                title: '每周技术直播回放',
                desc: '每周五晚 8 点，YuleTech 技术专家直播答疑，覆盖 AutoSAR 各模块技术要点。',
                level: '全阶段',
                duration: '每周更新',
                students: 4500,
                rating: 4.8,
                free: true,
                tags: ['直播', '答疑'],
            },
            {
                title: '1对1 专家咨询',
                desc: '预约 YuleTech 资深架构师进行一对一技术咨询，解决项目中的具体技术难题。',
                level: '高级',
                duration: '按小时',
                students: 230,
                rating: 5.0,
                free: false,
                tags: ['咨询', '专家'],
            },
        ],
    },
];
const learningPaths = [
    {
        title: 'AutoSAR 入门路线',
        steps: ['规范基础', '工具链使用', 'MCAL 配置', 'ECUAL 开发'],
        icon: GraduationCap,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'AutoSAR 进阶路线',
        steps: ['通信栈深入', '诊断开发', '存储管理', '功能安全'],
        icon: Award,
        color: 'from-cyan-500 to-teal-500',
    },
    {
        title: 'AutoSAR 专家路线',
        steps: ['架构设计', '性能优化', '多核配置', '工具链定制'],
        icon: Lightbulb,
        color: 'from-teal-500 to-emerald-500',
    },
];
export function LearningPage() {
    const [activeCategory, setActiveCategory] = useState('全部');
    const filteredCourses = activeCategory === '全部'
        ? courses
        : courses.filter((c) => c.category === activeCategory);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [_jsx(BookOpen, { className: "w-4 h-4" }), "\u5B66\u4E60\u6210\u957F"] }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["\u5DE5\u7A0B\u5E08\u7684", _jsx("span", { className: "text-gradient-accent", children: " \u6210\u957F\u5E73\u53F0" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u7CFB\u7EDF\u5316\u7684 AutoSAR \u5B66\u4E60\u8DEF\u5F84\uFF0C\u4ECE\u5165\u95E8\u5230\u4E13\u5BB6\u3002 \u89C6\u9891\u8BFE\u7A0B\u3001\u5B9E\u6218\u9879\u76EE\u3001\u4E13\u5BB6\u95EE\u7B54\uFF0C\u5E2E\u52A9\u4F60\u5FEB\u901F\u6210\u957F\u4E3A\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u4E13\u5BB6\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: ["\u5F00\u59CB\u5B66\u4E60", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), _jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [_jsx(Users, { className: "w-4 h-4" }), "\u52A0\u5165\u5B66\u4E60\u5C0F\u7EC4"] })] })] }) }) }), _jsx("section", { className: "py-8 border-y border-border bg-card/30", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "100+" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u7CBE\u54C1\u8BFE\u7A0B" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "12,000+" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5B66\u4E60\u4EBA\u6B21" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "45" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5B9E\u6218\u9879\u76EE" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "320+" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u95EE\u9898\u5DF2\u89E3\u51B3" })] })] }) }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-4", children: "\u7CFB\u7EDF\u5316\u5B66\u4E60\u8DEF\u5F84" }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "\u4ECE\u96F6\u57FA\u7840\u5230\u4E13\u5BB6\uFF0C\u6211\u4EEC\u4E3A\u4E0D\u540C\u9636\u6BB5\u7684\u5B66\u4E60\u8005\u8BBE\u8BA1\u4E86\u6E05\u6670\u7684\u5B66\u4E60\u8DEF\u7EBF" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: learningPaths.map((path) => (_jsxs("div", { className: "group bg-card border border-border rounded-2xl p-6 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`, children: _jsx(path.icon, { className: "w-6 h-6 text-white" }) }), _jsx("h3", { className: "font-semibold text-lg mb-4", children: path.title }), _jsx("div", { className: "space-y-3", children: path.steps.map((step, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground", children: i + 1 }), _jsx("span", { className: "text-sm", children: step }), _jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })] }, step))) }), _jsx("button", { className: "mt-6 w-full py-2.5 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary))] hover:text-primary-foreground transition-all border border-border", children: "\u67E5\u770B\u8BE6\u60C5" })] }, path.title))) })] }) }), _jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories.map((cat) => (_jsx("button", { onClick: () => setActiveCategory(cat), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: cat }, cat))) }) }) }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: filteredCourses.map((cat) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: `w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center`, children: _jsx(cat.icon, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-xl font-bold", children: cat.category })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: cat.items.map((item) => (_jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant flex flex-col", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h3", { className: "font-semibold leading-snug", children: item.title }), item.free ? (_jsx("span", { className: "text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2", children: "\u514D\u8D39" })) : (_jsxs("span", { className: "text-xs font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2", children: [_jsx(Lock, { className: "w-3 h-3 inline mr-0.5" }), "\u4F1A\u5458"] }))] }), _jsx("p", { className: "text-sm text-muted-foreground mb-4 flex-1", children: item.desc }), _jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: item.tags.map((tag) => (_jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag))) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3.5 h-3.5" }), " ", item.duration] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3.5 h-3.5" }), " ", item.students] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3.5 h-3.5 text-amber-500" }), " ", item.rating] })] }), _jsx("button", { className: "w-full py-2.5 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: item.free ? '立即学习' : '查看详情' })] }, item.title))) })] }, cat.category))) }) }), _jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u6210\u4E3A YuleTech \u8BB2\u5E08" }), _jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u5982\u679C\u4F60\u662F\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u9886\u57DF\u7684\u4E13\u5BB6\uFF0C\u6B22\u8FCE\u52A0\u5165 YuleTech \u8BB2\u5E08\u56E2\u961F\uFF0C \u4E0E thousands of \u5DE5\u7A0B\u5E08\u5206\u4EAB\u4F60\u7684\u77E5\u8BC6\u548C\u7ECF\u9A8C\uFF0C\u540C\u65F6\u83B7\u5F97\u6536\u76CA\u5206\u6210\u3002" }), _jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u7533\u8BF7\u6210\u4E3A\u8BB2\u5E08" })] }) })] }));
}
