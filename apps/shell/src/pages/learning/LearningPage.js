import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, FileText, Users, Clock, ChevronRight } from 'lucide-react';
export function LearningPage() {
    const [activeTab, setActiveTab] = useState('courses');
    const courses = [
        {
            id: 1,
            title: 'AutoSAR 基础入门',
            desc: '从零学习 AutoSAR 架构和开发流程',
            level: '入门',
            duration: '12小时',
            students: 1250,
        },
        {
            id: 2,
            title: 'MCAL 开发实践',
            desc: '深入讲解微控制器驱动开发',
            level: '进阶',
            duration: '20小时',
            students: 890,
        },
    ];
    const tutorials = [
        { id: 1, title: 'Port 驱动配置详解', category: 'MCAL', readTime: '15分钟' },
        { id: 2, title: 'Dio 中断处理机制', category: 'MCAL', readTime: '20分钟' },
        { id: 3, title: 'CAN 通信协议实现', category: 'Services', readTime: '30分钟' },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx("section", { className: "pt-24 pb-16 px-4", children: _jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6", children: [_jsx(BookOpen, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "\u5B66\u4E60\u6210\u957F" })] }), _jsxs("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: ["\u7CFB\u7EDF\u5316\u5B66\u4E60 ", _jsx("span", { className: "text-[hsl(var(--accent))]", children: "AutoSAR \u6280\u672F" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-8", children: "\u4ECE\u5165\u95E8\u5230\u7CBE\u901A\uFF0C\u63D0\u4F9B\u5B8C\u6574\u7684\u5B66\u4E60\u8DEF\u5F84\u3002\u89C6\u9891\u8BFE\u7A0B\u3001\u6280\u672F\u6587\u6863\u3001\u5B9E\u6218\u9879\u76EE\uFF0C \u5E2E\u52A9\u4F60\u5FEB\u901F\u638C\u63E1\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u5F00\u53D1\u3002" })] }) }), _jsx("section", { className: "py-8 px-4 border-y border-border", children: _jsx("div", { className: "max-w-7xl mx-auto flex justify-center gap-8", children: [
                        { id: 'courses', label: '视频课程', icon: Video },
                        { id: 'tutorials', label: '教程文档', icon: FileText },
                        { id: 'docs', label: '技术文档', icon: BookOpen },
                    ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id
                            ? 'bg-[hsl(var(--accent))] text-white'
                            : 'text-muted-foreground hover:bg-muted'}`, children: [_jsx(tab.icon, { className: "w-4 h-4" }), tab.label] }, tab.id))) }) }), _jsx("section", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [activeTab === 'courses' && (_jsx("div", { className: "grid md:grid-cols-2 gap-6", children: courses.map((course) => (_jsxs("div", { className: "p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: course.title }), _jsx("p", { className: "text-muted-foreground", children: course.desc })] }), _jsx("span", { className: "px-3 py-1 bg-accent/10 text-accent text-sm rounded-full", children: course.level })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4" }), course.duration] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4" }), course.students, " \u4EBA\u5B66\u4E60"] })] })] }, course.id))) })), activeTab === 'tutorials' && (_jsx("div", { className: "space-y-4", children: tutorials.map((tutorial) => (_jsxs("div", { className: "p-4 bg-card rounded-lg border border-border hover:border-[hsl(var(--accent))] transition-colors flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-1", children: tutorial.title }), _jsxs("span", { className: "text-sm text-muted-foreground", children: [tutorial.category, " \u00B7 ", tutorial.readTime] })] }), _jsx(ChevronRight, { className: "w-5 h-5 text-muted-foreground" })] }, tutorial.id))) })), activeTab === 'docs' && (_jsxs("div", { className: "text-center py-12", children: [_jsx(BookOpen, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: "\u6587\u6863\u4E2D\u5FC3" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "\u67E5\u770B\u5B8C\u6574\u7684 API \u6587\u6863\u548C\u5F00\u53D1\u6307\u5357" }), _jsx(Link, { to: "/docs", className: "px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: "\u6D4F\u89C8\u6587\u6863" })] }))] }) })] }));
}
