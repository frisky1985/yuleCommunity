import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Star, GitFork, ExternalLink, BookOpen, Download, CheckCircle2, Clock, Cpu, Layers, Database, Radio, Search, ArrowRight, } from 'lucide-react';
const layerFilters = ['全部', 'MCAL', 'ECUAL', 'Service', 'RTE + ASW'];
const modules = [
    {
        category: 'MCAL',
        layer: 'MCAL',
        icon: Cpu,
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        badgeColor: 'bg-blue-500/10 text-blue-500',
        desc: '微控制器驱动层 - 直接操作硬件寄存器',
        items: [
            { name: 'Mcu', status: '已完成', version: 'v1.2.0', stars: 48, forks: 12, docs: true, desc: '微控制器驱动，负责时钟、复位和功耗管理' },
            { name: 'Port', status: '已完成', version: 'v1.1.0', stars: 42, forks: 10, docs: true, desc: '端口驱动，配置引脚功能和方向' },
            { name: 'Dio', status: '已完成', version: 'v1.1.0', stars: 38, forks: 8, docs: true, desc: '数字IO驱动，读写引脚电平状态' },
            { name: 'Can', status: '已完成', version: 'v1.3.0', stars: 56, forks: 18, docs: true, desc: 'CAN控制器驱动，支持CAN FD协议' },
            { name: 'Spi', status: '已完成', version: 'v1.2.0', stars: 44, forks: 11, docs: true, desc: 'SPI串行外设接口驱动' },
            { name: 'Gpt', status: '已完成', version: 'v1.1.0', stars: 35, forks: 7, docs: true, desc: '通用定时器驱动' },
            { name: 'Pwm', status: '已完成', version: 'v1.1.0', stars: 32, forks: 6, docs: true, desc: '脉宽调制驱动' },
            { name: 'Adc', status: '已完成', version: 'v1.2.0', stars: 40, forks: 9, docs: true, desc: '模数转换驱动' },
            { name: 'Wdg', status: '已完成', version: 'v1.0.0', stars: 28, forks: 5, docs: true, desc: '看门狗驱动' },
        ],
    },
    {
        category: 'ECUAL',
        layer: 'ECUAL',
        icon: Layers,
        color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
        badgeColor: 'bg-cyan-500/10 text-cyan-500',
        desc: 'ECU 抽象层 - 硬件抽象与接口标准化',
        items: [
            { name: 'CanIf', status: '已完成', version: 'v1.2.0', stars: 52, forks: 14, docs: true, desc: 'CAN接口层，统一管理CAN通信' },
            { name: 'IoHwAb', status: '已完成', version: 'v1.1.0', stars: 36, forks: 8, docs: true, desc: 'IO硬件抽象层' },
            { name: 'CanTp', status: '已完成', version: 'v1.1.0', stars: 41, forks: 10, docs: true, desc: 'CAN传输协议层(ISO 15765-2)' },
            { name: 'EthIf', status: '已完成', version: 'v1.0.0', stars: 33, forks: 7, docs: true, desc: '以太网接口层' },
            { name: 'MemIf', status: '已完成', version: 'v1.1.0', stars: 29, forks: 6, docs: true, desc: '存储器接口层' },
            { name: 'Fee', status: '已完成', version: 'v1.1.0', stars: 31, forks: 7, docs: true, desc: 'Flash EEPROM仿真层' },
            { name: 'Ea', status: '已完成', version: 'v1.0.0', stars: 25, forks: 5, docs: true, desc: 'EEPROM抽象层' },
            { name: 'FrIf', status: '已完成', version: 'v1.0.0', stars: 22, forks: 4, docs: true, desc: 'FlexRay接口层' },
            { name: 'LinIf', status: '已完成', version: 'v1.0.0', stars: 24, forks: 5, docs: true, desc: 'LIN接口层' },
        ],
    },
    {
        category: 'Service',
        layer: 'Service',
        icon: Database,
        color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
        badgeColor: 'bg-teal-500/10 text-teal-500',
        desc: '服务层 - 通信、存储与诊断服务',
        items: [
            { name: 'Com', status: '开发中', version: 'v0.8.0', stars: 18, forks: 4, docs: true, desc: '通信服务层，信号路由与打包' },
            { name: 'PduR', status: '开发中', version: 'v0.7.0', stars: 15, forks: 3, docs: true, desc: 'PDU路由器，协议数据单元路由' },
            { name: 'NvM', status: '规划中', version: '-', stars: 12, forks: 2, docs: false, desc: '非易失性存储管理器' },
            { name: 'Dcm', status: '规划中', version: '-', stars: 10, forks: 2, docs: false, desc: '诊断通信管理器(UDS)' },
            { name: 'Dem', status: '规划中', version: '-', stars: 8, forks: 1, docs: false, desc: '诊断事件管理器' },
        ],
    },
    {
        category: 'RTE + ASW',
        layer: 'RTE + ASW',
        icon: Radio,
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        badgeColor: 'bg-emerald-500/10 text-emerald-500',
        desc: '运行时环境 + 应用层组件',
        items: [
            { name: 'Rte', status: '头文件完成', version: 'v0.5.0', stars: 14, forks: 3, docs: true, desc: '运行时环境，组件间通信接口' },
            { name: 'EngineControl', status: '规划中', version: '-', stars: 6, forks: 1, docs: false, desc: '发动机控制应用组件' },
            { name: 'VehicleDynamics', status: '规划中', version: '-', stars: 5, forks: 1, docs: false, desc: '车辆动力学应用组件' },
            { name: 'DiagnosticManager', status: '规划中', version: '-', stars: 4, forks: 0, docs: false, desc: '诊断管理应用组件' },
            { name: 'IOControl', status: '规划中', version: '-', stars: 4, forks: 0, docs: false, desc: 'IO控制应用组件' },
        ],
    },
];
export function OpenSourcePage() {
    const [activeFilter, setActiveFilter] = useState('全部');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredModules = modules
        .filter((m) => activeFilter === '全部' || m.layer === activeFilter)
        .map((m) => ({
        ...m,
        items: m.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.includes(searchQuery)),
    }))
        .filter((m) => m.items.length > 0);
    return (_jsxs("div", { className: "min-h-screen pt-16", children: [_jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [_jsx(Star, { className: "w-4 h-4" }), "\u5F00\u6E90\u9879\u76EE"] }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["AutoSAR BSW", _jsx("span", { className: "text-gradient-accent", children: " \u5F00\u6E90\u4EE3\u7801" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u57FA\u4E8E AutoSAR Classic Platform 4.x \u6807\u51C6\uFF0C\u4E3A NXP i.MX8M Mini \u5904\u7406\u5668\u6784\u5EFA\u5B8C\u6574\u7684 BSW \u6808\u3002 \u4ECE\u5E95\u5C42\u9A71\u52A8\u5230\u5E94\u7528\u7EC4\u4EF6\uFF0C\u5168\u90E8\u5F00\u6E90\uFF0C\u6C38\u4E45\u514D\u8D39\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: [_jsx(GitFork, { className: "w-4 h-4" }), "Fork \u5168\u90E8\u4EE3\u7801", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), _jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [_jsx(BookOpen, { className: "w-4 h-4" }), "\u8D21\u732E\u6307\u5357"] })] })] }) }) }), _jsx("section", { className: "py-8 border-y border-border bg-card/50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "32" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5F00\u6E90\u6A21\u5757" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "18" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5DF2\u5B8C\u6210" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "5" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5F00\u53D1\u4E2D" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "9" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u89C4\u5212\u4E2D" })] })] }) }) }), _jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 justify-between", children: [_jsx("div", { className: "flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0", children: layerFilters.map((filter) => (_jsx("button", { onClick: () => setActiveFilter(filter), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                        ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                        : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: filter }, filter))) }), _jsxs("div", { className: "relative w-full sm:w-72", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6A21\u5757...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50" })] })] }) }) }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: filteredModules.map((mod) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: `w-10 h-10 rounded-lg ${mod.color} flex items-center justify-center border`, children: _jsx(mod.icon, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold", children: mod.category }), _jsx("p", { className: "text-sm text-muted-foreground", children: mod.desc })] }), _jsxs("span", { className: `ml-auto px-3 py-1 rounded-full text-xs font-medium ${mod.badgeColor}`, children: [mod.items.length, " \u6A21\u5757"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: mod.items.map((item) => (_jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [_jsx("div", { className: "flex items-start justify-between mb-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "font-mono font-semibold text-lg", children: item.name }), item.status === '已完成' ? (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), " \u5DF2\u5B8C\u6210"] })) : item.status === '开发中' ? (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full", children: [_jsx(Clock, { className: "w-3 h-3" }), " \u5F00\u53D1\u4E2D"] })) : (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [_jsx(Clock, { className: "w-3 h-3" }), " \u89C4\u5212\u4E2D"] }))] }) }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: item.desc }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center gap-4 text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3.5 h-3.5" }), " ", item.stars] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(GitFork, { className: "w-3.5 h-3.5" }), " ", item.forks] }), item.version !== '-' && (_jsx("span", { className: "font-mono text-xs", children: item.version }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [item.docs && (_jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: _jsx(BookOpen, { className: "w-4 h-4" }) })), _jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: _jsx(Download, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: _jsx(ExternalLink, { className: "w-4 h-4" }) })] })] })] }, item.name))) })] }, mod.category))) }) }), _jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u6210\u4E3A\u5F00\u6E90\u8D21\u732E\u8005" }), _jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u65E0\u8BBA\u4F60\u662F\u7ECF\u9A8C\u4E30\u5BCC\u7684\u6C7D\u8F66\u8F6F\u4EF6\u5DE5\u7A0B\u5E08\uFF0C\u8FD8\u662F\u521A\u5165\u95E8\u7684\u7231\u597D\u8005\uFF0C YuleTech \u793E\u533A\u90FD\u6B22\u8FCE\u4F60\u7684\u8D21\u732E\u3002\u63D0\u4EA4\u4EE3\u7801\u3001\u62A5\u544A\u95EE\u9898\u3001\u5B8C\u5584\u6587\u6863\uFF0C \u4E0E\u6211\u4EEC\u4E00\u8D77\u6253\u9020\u4E2D\u56FD\u6700\u4F18\u79C0\u7684 AutoSAR \u5F00\u6E90\u751F\u6001\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u9605\u8BFB\u8D21\u732E\u6307\u5357" }), _jsx("button", { className: "px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20", children: "\u67E5\u770B\u5F85\u529E\u4EFB\u52A1" })] })] }) })] }));
}
