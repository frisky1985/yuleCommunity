import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BookOpen, Search, CheckCircle2, Clock, ExternalLink, FileText, Code2, Layers, Cpu, Database, Radio, ChevronRight, ArrowRight, AlertCircle, } from 'lucide-react';
const layerFilters = ['全部', 'MCAL', 'ECUAL', 'Service', 'RTE'];
const docModules = [
    {
        layer: 'MCAL',
        icon: Cpu,
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        badgeColor: 'bg-blue-500/10 text-blue-500',
        desc: '微控制器驱动层 API 文档',
        items: [
            { name: 'Mcu', version: 'v1.2.0', apis: 24, coverage: 100, status: '已完成', desc: '微控制器驱动 API，包含时钟、复位和功耗管理接口' },
            { name: 'Port', version: 'v1.1.0', apis: 18, coverage: 100, status: '已完成', desc: '端口驱动 API，引脚配置和方向控制' },
            { name: 'Dio', version: 'v1.1.0', apis: 12, coverage: 100, status: '已完成', desc: '数字 IO 驱动 API，读写引脚电平' },
            { name: 'Can', version: 'v1.3.0', apis: 32, coverage: 100, status: '已完成', desc: 'CAN 控制器驱动 API，支持 CAN FD 协议' },
            { name: 'Spi', version: 'v1.2.0', apis: 28, coverage: 100, status: '已完成', desc: 'SPI 串行外设接口驱动 API' },
            { name: 'Gpt', version: 'v1.1.0', apis: 16, coverage: 100, status: '已完成', desc: '通用定时器驱动 API' },
            { name: 'Pwm', version: 'v1.1.0', apis: 14, coverage: 100, status: '已完成', desc: '脉宽调制驱动 API' },
            { name: 'Adc', version: 'v1.2.0', apis: 22, coverage: 100, status: '已完成', desc: '模数转换驱动 API' },
            { name: 'Wdg', version: 'v1.0.0', apis: 10, coverage: 100, status: '已完成', desc: '看门狗驱动 API' },
        ],
    },
    {
        layer: 'ECUAL',
        icon: Layers,
        color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
        badgeColor: 'bg-cyan-500/10 text-cyan-500',
        desc: 'ECU 抽象层 API 文档',
        items: [
            { name: 'CanIf', version: 'v1.2.0', apis: 28, coverage: 100, status: '已完成', desc: 'CAN 接口层 API，统一管理 CAN 通信' },
            { name: 'IoHwAb', version: 'v1.1.0', apis: 20, coverage: 100, status: '已完成', desc: 'IO 硬件抽象层 API' },
            { name: 'CanTp', version: 'v1.1.0', apis: 18, coverage: 100, status: '已完成', desc: 'CAN 传输协议层 API (ISO 15765-2)' },
            { name: 'EthIf', version: 'v1.0.0', apis: 24, coverage: 100, status: '已完成', desc: '以太网接口层 API' },
            { name: 'MemIf', version: 'v1.1.0', apis: 14, coverage: 100, status: '已完成', desc: '存储器接口层 API' },
            { name: 'Fee', version: 'v1.1.0', apis: 16, coverage: 100, status: '已完成', desc: 'Flash EEPROM 仿真层 API' },
            { name: 'Ea', version: 'v1.0.0', apis: 14, coverage: 100, status: '已完成', desc: 'EEPROM 抽象层 API' },
            { name: 'FrIf', version: 'v1.0.0', apis: 22, coverage: 100, status: '已完成', desc: 'FlexRay 接口层 API' },
            { name: 'LinIf', version: 'v1.0.0', apis: 18, coverage: 100, status: '已完成', desc: 'LIN 接口层 API' },
        ],
    },
    {
        layer: 'Service',
        icon: Database,
        color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
        badgeColor: 'bg-teal-500/10 text-teal-500',
        desc: '服务层 API 文档',
        items: [
            { name: 'Com', version: 'v0.8.0', apis: 36, coverage: 80, status: '开发中', desc: '通信服务层 API，信号路由与打包' },
            { name: 'PduR', version: 'v0.7.0', apis: 24, coverage: 75, status: '开发中', desc: 'PDU 路由器 API，协议数据单元路由' },
            { name: 'NvM', version: '-', apis: 0, coverage: 0, status: '规划中', desc: '非易失性存储管理器 API' },
            { name: 'Dcm', version: '-', apis: 0, coverage: 0, status: '规划中', desc: '诊断通信管理器 API (UDS)' },
            { name: 'Dem', version: '-', apis: 0, coverage: 0, status: '规划中', desc: '诊断事件管理器 API' },
        ],
    },
    {
        layer: 'RTE',
        icon: Radio,
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        badgeColor: 'bg-emerald-500/10 text-emerald-500',
        desc: '运行时环境 API 文档',
        items: [
            { name: 'Rte', version: 'v0.5.0', apis: 20, coverage: 60, status: '头文件完成', desc: '运行时环境，组件间通信接口' },
        ],
    },
];
const quickLinks = [
    { title: '快速入门指南', desc: '5 分钟了解 YuleTech BSW 项目结构', icon: BookOpen, color: 'text-blue-500' },
    { title: 'API 参考手册', desc: '完整的 C 语言 API 接口说明', icon: Code2, color: 'text-cyan-500' },
    { title: '配置参数手册', desc: 'ARXML 配置参数详细说明', icon: FileText, color: 'text-teal-500' },
    { title: '错误码参考', desc: 'DET 错误码和运行时错误说明', icon: AlertCircle, color: 'text-amber-500' },
];
export function DocsPage() {
    const [activeFilter, setActiveFilter] = useState('全部');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredModules = docModules
        .filter((m) => activeFilter === '全部' || m.layer === activeFilter)
        .map((m) => ({
        ...m,
        items: m.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.includes(searchQuery)),
    }))
        .filter((m) => m.items.length > 0);
    const totalApis = docModules.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.apis, 0), 0);
    const totalModules = docModules.reduce((sum, m) => sum + m.items.length, 0);
    const completedModules = docModules.reduce((sum, m) => sum + m.items.filter((i) => i.status === '已完成').length, 0);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [_jsx(BookOpen, { className: "w-4 h-4" }), "\u6587\u6863\u4E2D\u5FC3"] }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["YuleTech BSW", _jsx("span", { className: "text-gradient-accent", children: " \u5F00\u53D1\u6587\u6863" })] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u5B8C\u6574\u7684 AutoSAR BSW \u6A21\u5757 API \u6587\u6863\u3001\u914D\u7F6E\u6307\u5357\u548C\u5F00\u53D1\u624B\u518C\u3002 \u4ECE MCAL \u9A71\u52A8\u5230 RTE \u63A5\u53E3\uFF0C\u5E2E\u52A9\u4F60\u5FEB\u901F\u4E0A\u624B\u9879\u76EE\u5F00\u53D1\u3002" }), _jsxs("div", { className: "max-w-xl mx-auto relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6A21\u5757\u3001API\u3001\u914D\u7F6E\u53C2\u6570...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50 shadow-elegant" })] })] }) }) }), _jsx("section", { className: "py-8 border-y border-border bg-card/30", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: totalModules }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u6587\u6863\u6A21\u5757" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: totalApis }), _jsx("div", { className: "text-sm text-muted-foreground", children: "API \u63A5\u53E3" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: completedModules }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u5DF2\u5B8C\u6210\u6587\u6863" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "92%" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "\u6574\u4F53\u8986\u76D6\u7387" })] })] }) }) }), !searchQuery && activeFilter === '全部' && (_jsx("section", { className: "py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "\u5FEB\u901F\u5165\u53E3" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: quickLinks.map((link) => (_jsx("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant cursor-pointer", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0", children: _jsx(link.icon, { className: `w-5 h-5 ${link.color}` }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-sm mb-1 group-hover:text-[hsl(var(--accent))] transition-colors", children: link.title }), _jsx("p", { className: "text-xs text-muted-foreground", children: link.desc })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors flex-shrink-0 mt-1" })] }) }, link.title))) })] }) })), _jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: layerFilters.map((filter) => (_jsx("button", { onClick: () => setActiveFilter(filter), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: filter }, filter))) }) }) }), _jsx("section", { className: "py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [filteredModules.length === 0 && (_jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [_jsx(BookOpen, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }), _jsx("p", { children: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u6587\u6863" })] })), filteredModules.map((mod) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: `w-10 h-10 rounded-lg ${mod.color} flex items-center justify-center border`, children: _jsx(mod.icon, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold", children: mod.layer }), _jsx("p", { className: "text-sm text-muted-foreground", children: mod.desc })] }), _jsxs("span", { className: `ml-auto px-3 py-1 rounded-full text-xs font-medium ${mod.badgeColor}`, children: [mod.items.length, " \u6A21\u5757"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: mod.items.map((item) => (_jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [_jsx("div", { className: "flex items-start justify-between mb-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "font-mono font-semibold text-lg", children: item.name }), item.status === '已完成' ? (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), " ", item.status] })) : item.status === '开发中' || item.status === '头文件完成' ? (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full", children: [_jsx(Clock, { className: "w-3 h-3" }), " ", item.status] })) : (_jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [_jsx(Clock, { className: "w-3 h-3" }), " ", item.status] }))] }) }), _jsx("p", { className: "text-sm text-muted-foreground mb-4 min-h-[2.5rem]", children: item.desc }), _jsxs("div", { className: "space-y-2 mb-4", children: [_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "API \u6570\u91CF" }), _jsx("span", { className: "font-mono font-medium", children: item.apis })] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "\u6587\u6863\u8986\u76D6\u7387" }), _jsxs("span", { className: "font-medium", children: [item.coverage, "%"] })] }), _jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: `h-full rounded-full transition-all ${item.coverage === 100
                                                                ? 'bg-emerald-500'
                                                                : item.coverage >= 60
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-muted-foreground/30'}`, style: { width: `${item.coverage}%` } }) })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "font-mono text-xs text-muted-foreground", children: item.version }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { className: "flex items-center gap-1 px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-medium hover:bg-[hsl(var(--primary))] hover:text-primary-foreground transition-colors border border-border", children: [_jsx(FileText, { className: "w-3.5 h-3.5" }), "API \u6587\u6863"] }), _jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: _jsx(ExternalLink, { className: "w-4 h-4" }) })] })] })] }, item.name))) })] }, mod.layer)))] }) }), _jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u5B8C\u5584\u6587\u6863\uFF0C\u5E2E\u52A9\u66F4\u591A\u5F00\u53D1\u8005" }), _jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "YuleTech \u7684\u6587\u6863\u8D28\u91CF\u79BB\u4E0D\u5F00\u793E\u533A\u8D21\u732E\u3002\u65E0\u8BBA\u662F\u8865\u5145 API \u8BF4\u660E\u3001\u4FEE\u6B63\u9519\u8BEF\uFF0C\u8FD8\u662F\u7FFB\u8BD1\u5185\u5BB9\uFF0C \u6BCF\u4E00\u4EFD\u8D21\u732E\u90FD\u80FD\u8BA9\u6587\u6863\u66F4\u52A0\u5B8C\u5584\uFF0C\u5E2E\u52A9\u66F4\u591A\u5DE5\u7A0B\u5E08\u5FEB\u901F\u4E0A\u624B\u3002" }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsxs("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2", children: [_jsx(FileText, { className: "w-4 h-4" }), "\u53C2\u4E0E\u6587\u6863\u8D21\u732E"] }), _jsxs("button", { className: "px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2", children: [_jsx(ArrowRight, { className: "w-4 h-4" }), "\u67E5\u770B\u6587\u6863\u89C4\u8303"] })] })] }) })] }));
}
