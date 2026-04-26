import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Wrench, Download, ExternalLink, CheckCircle2, Settings, FileCode, Bug, TestTube, ArrowRight, Zap, Shield, Monitor, } from 'lucide-react';
import { ConfigGenerator } from '../components/ConfigGenerator';
const categories = ['全部', '配置工具', '编译脚本', '调试工具', '测试验证'];
const tools = [
    {
        category: '配置工具',
        icon: Settings,
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        items: [
            {
                name: 'YuleConfig',
                desc: '可视化 AutoSAR BSW 配置工具，支持 MCAL/ECUAL/Service 全栈配置，一键生成标准 ARXML 文件',
                version: 'v2.1.0',
                platform: 'Windows / Linux',
                free: true,
                status: '已发布',
                downloads: 1240,
            },
            {
                name: 'ARXML Generator',
                desc: '命令行 ARXML 代码生成器，支持模板自定义和批量生成，CI/CD 集成友好',
                version: 'v1.3.0',
                platform: '跨平台',
                free: true,
                status: '已发布',
                downloads: 856,
            },
            {
                name: 'ECU Extractor',
                desc: '从现有项目中提取 ECU 配置并生成可复用的配置模板',
                version: 'v1.0.0',
                platform: 'Windows',
                free: true,
                status: '已发布',
                downloads: 432,
            },
        ],
    },
    {
        category: '编译脚本',
        icon: FileCode,
        color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
        items: [
            {
                name: 'YuleBuild',
                desc: '基于 CMake 的跨平台编译系统，内置 i.MX8M Mini 工具链配置，支持多核编译',
                version: 'v1.5.0',
                platform: '跨平台',
                free: true,
                status: '已发布',
                downloads: 2103,
            },
            {
                name: 'MemMap Generator',
                desc: 'AutoSAR MemMap.h 自动生成工具，根据链接器脚本生成标准内存分区头文件',
                version: 'v1.2.0',
                platform: '跨平台',
                free: true,
                status: '已发布',
                downloads: 678,
            },
            {
                name: 'Docker DevEnv',
                desc: '一键搭建开发环境的 Docker 镜像，包含交叉编译器、调试器和静态分析工具',
                version: 'v1.0.0',
                platform: 'Linux / macOS',
                free: true,
                status: '已发布',
                downloads: 920,
            },
        ],
    },
    {
        category: '调试工具',
        icon: Bug,
        color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
        items: [
            {
                name: 'YuleTrace',
                desc: '实时 Trace 日志分析工具，支持 Multi-Core 核间通信监控和时序分析',
                version: 'v1.1.0',
                platform: 'Windows / Linux',
                free: true,
                status: '已发布',
                downloads: 756,
            },
            {
                name: 'CanAnalyzer',
                desc: 'CAN/LIN 总线分析工具，支持 DBC 解析、信号监控和报文回放',
                version: 'v2.0.0',
                platform: 'Windows',
                free: true,
                status: '已发布',
                downloads: 1567,
            },
            {
                name: 'UDS Diagnostic',
                desc: 'UDS 诊断服务测试工具，支持 ISO 14229 标准服务测试和故障码读取',
                version: 'v1.0.0',
                platform: 'Windows',
                free: false,
                status: '已发布',
                downloads: 340,
            },
        ],
    },
    {
        category: '测试验证',
        icon: TestTube,
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        items: [
            {
                name: 'YuleTest',
                desc: 'AutoSAR BSW 单元测试框架，基于 GoogleTest 定制，支持模块级覆盖率分析',
                version: 'v1.2.0',
                platform: '跨平台',
                free: true,
                status: '已发布',
                downloads: 890,
            },
            {
                name: 'SIL Simulator',
                desc: '软件在环仿真平台，模拟 i.MX8M Mini 外设行为，无需硬件即可验证驱动逻辑',
                version: 'v0.9.0',
                platform: 'Linux / Windows',
                free: true,
                status: 'Beta',
                downloads: 456,
            },
            {
                name: 'MISRA Checker',
                desc: '静态代码分析工具，内置 MISRA C:2012 规则集和 AutoSAR 编码规范检查',
                version: 'v1.0.0',
                platform: '跨平台',
                free: false,
                status: '已发布',
                downloads: 234,
            },
        ],
    },
];
const highlights = [
    {
        icon: Zap,
        title: '开箱即用',
        desc: '内置 i.MX8M Mini 完整工具链配置，下载后 5 分钟即可开始开发',
    },
    {
        icon: Shield,
        title: '企业级安全',
        desc: '通过 MISRA C:2012 和 ISO 26262 工具认证支持，满足功能安全开发要求',
    },
    {
        icon: Monitor,
        title: '全平台支持',
        desc: 'Windows、Linux、macOS 全平台覆盖，支持 Docker 容器化部署',
    },
];
export function ToolchainPage() {
    const [activeCategory, setActiveCategory] = useState('全部');
    const filteredTools = activeCategory === '全部'
        ? tools
        : tools.filter((t) => t.category === activeCategory);
    return (_jsxs("div", { className: "min-h-screen pt-16", children: [_jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [_jsx(Wrench, { className: "w-4 h-4" }), "\u5F00\u53D1\u5DE5\u5177\u94FE"] }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["\u4E00\u7AD9\u5F0F\u6C7D\u8F66\u8F6F\u4EF6", _jsx("span", { className: "text-gradient-accent", children: " \u5F00\u53D1\u5DE5\u5177" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u4ECE\u53EF\u89C6\u5316\u914D\u7F6E\u5230\u7F16\u8BD1\u6784\u5EFA\uFF0C\u4ECE\u8C03\u8BD5\u8BCA\u65AD\u5230\u6D4B\u8BD5\u9A8C\u8BC1\uFF0C YuleTech \u63D0\u4F9B\u5B8C\u6574\u7684 AutoSAR BSW \u5F00\u53D1\u5DE5\u5177\u94FE\uFF0C \u5E2E\u52A9\u5DE5\u7A0B\u5E08\u9AD8\u6548\u5B8C\u6210\u4ECE\u914D\u7F6E\u5230\u4EA7\u54C1\u7684\u5168\u6D41\u7A0B\u5F00\u53D1\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: [_jsx(Download, { className: "w-4 h-4" }), "\u4E0B\u8F7D\u5DE5\u5177\u96C6", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), _jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [_jsx(ExternalLink, { className: "w-4 h-4" }), "\u67E5\u770B\u6587\u6863"] })] })] }) }) }), _jsx("section", { className: "py-12 border-y border-border bg-card/30", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: highlights.map((h) => (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0", children: _jsx(h.icon, { className: "w-6 h-6 text-[hsl(var(--primary))]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-1", children: h.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: h.desc })] })] }, h.title))) }) }) }), _jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories.map((cat) => (_jsx("button", { onClick: () => setActiveCategory(cat), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: cat }, cat))) }) }) }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: filteredTools.map((cat) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: `w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center border`, children: _jsx(cat.icon, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-xl font-bold", children: cat.category })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: cat.items.map((tool) => (_jsxs("div", { className: "group bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("h3", { className: "font-semibold text-lg", children: tool.name }), tool.status === '已发布' ? (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), " ", tool.status] })) : (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full", children: [_jsx(Zap, { className: "w-3 h-3" }), " ", tool.status] }))] }), _jsx("p", { className: "text-sm text-muted-foreground mb-4 min-h-[2.5rem]", children: tool.desc }), _jsxs("div", { className: "space-y-2 mb-4", children: [_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "\u7248\u672C" }), _jsx("span", { className: "font-mono font-medium", children: tool.version })] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "\u5E73\u53F0" }), _jsx("span", { children: tool.platform })] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "\u8BB8\u53EF" }), _jsx("span", { className: tool.free ? 'text-emerald-500' : 'text-[hsl(var(--accent))]', children: tool.free ? '永久免费' : '企业版' })] })] }), _jsxs("div", { className: "flex items-center gap-2 pt-4 border-t border-border", children: [_jsxs("button", { className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: [_jsx(Download, { className: "w-3.5 h-3.5" }), "\u4E0B\u8F7D"] }), _jsxs("button", { className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors border border-border", children: [_jsx(ExternalLink, { className: "w-3.5 h-3.5" }), "\u6587\u6863"] })] })] }, tool.name))) })] }, cat.category))) }) }), _jsx(ConfigGenerator, {}), _jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u5DE5\u5177\u94FE\u63D2\u4EF6\u751F\u6001" }), _jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u6B22\u8FCE\u7B2C\u4E09\u65B9\u5F00\u53D1\u8005\u548C\u5DE5\u5177\u5382\u5546\u4E3A YuleTech \u5DE5\u5177\u94FE\u5F00\u53D1\u63D2\u4EF6\u3002 \u5B89\u5168\u52A0\u5BC6\u5DE5\u5177\u3001\u8BCA\u65AD\u63D2\u4EF6\u3001\u4EE3\u7801\u683C\u5F0F\u5316\u5DE5\u5177\u7B49\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7\u63D2\u4EF6\u5F62\u5F0F\u96C6\u6210\u5230\u6211\u4EEC\u7684\u5E73\u53F0\u3002" }), _jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u5F00\u53D1\u63D2\u4EF6" })] }) })] }));
}
