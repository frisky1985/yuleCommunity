import { importShared } from './__federation_fn_import-DPk4vyf3.js';
import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';
import { C as ConfigGenerator } from './ConfigGenerator-CCV27rdu.js';

const {useState: useState$1} = await importShared('react');

const {Star,GitFork,ExternalLink: ExternalLink$1,BookOpen,Download: Download$1,CheckCircle2: CheckCircle2$1,Clock,Cpu,Layers,Database,Radio,Search,ArrowRight: ArrowRight$1} = await importShared('lucide-react');

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
function OpenSourcePage() {
    const [activeFilter, setActiveFilter] = useState$1('全部');
    const [searchQuery, setSearchQuery] = useState$1('');
    const filteredModules = modules
        .filter((m) => activeFilter === '全部' || m.layer === activeFilter)
        .map((m) => ({
        ...m,
        items: m.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.includes(searchQuery)),
    }))
        .filter((m) => m.items.length > 0);
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen pt-16", children: [jsxRuntimeExports.jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }), "\u5F00\u6E90\u9879\u76EE"] }), jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["AutoSAR BSW", jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: " \u5F00\u6E90\u4EE3\u7801" })] }), jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u57FA\u4E8E AutoSAR Classic Platform 4.x \u6807\u51C6\uFF0C\u4E3A NXP i.MX8M Mini \u5904\u7406\u5668\u6784\u5EFA\u5B8C\u6574\u7684 BSW \u6808\u3002 \u4ECE\u5E95\u5C42\u9A71\u52A8\u5230\u5E94\u7528\u7EC4\u4EF6\uFF0C\u5168\u90E8\u5F00\u6E90\uFF0C\u6C38\u4E45\u514D\u8D39\u3002" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [jsxRuntimeExports.jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: [jsxRuntimeExports.jsx(GitFork, { className: "w-4 h-4" }), "Fork \u5168\u90E8\u4EE3\u7801", jsxRuntimeExports.jsx(ArrowRight$1, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }), "\u8D21\u732E\u6307\u5357"] })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-8 border-y border-border bg-card/50", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "32" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u5F00\u6E90\u6A21\u5757" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "18" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u5DF2\u5B8C\u6210" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "5" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u5F00\u53D1\u4E2D" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "9" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u89C4\u5212\u4E2D" })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 justify-between", children: [jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0", children: layerFilters.map((filter) => (jsxRuntimeExports.jsx("button", { onClick: () => setActiveFilter(filter), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                        ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                        : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: filter }, filter))) }), jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), jsxRuntimeExports.jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6A21\u5757...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50" })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: filteredModules.map((mod) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-lg ${mod.color} flex items-center justify-center border`, children: jsxRuntimeExports.jsx(mod.icon, { className: "w-5 h-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: mod.category }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: mod.desc })] }), jsxRuntimeExports.jsxs("span", { className: `ml-auto px-3 py-1 rounded-full text-xs font-medium ${mod.badgeColor}`, children: [mod.items.length, " \u6A21\u5757"] })] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: mod.items.map((item) => (jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-lg", children: item.name }), item.status === '已完成' ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(CheckCircle2$1, { className: "w-3 h-3" }), " \u5DF2\u5B8C\u6210"] })) : item.status === '开发中' ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }), " \u5F00\u53D1\u4E2D"] })) : (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }), " \u89C4\u5212\u4E2D"] }))] }) }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: item.desc }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-muted-foreground", children: [jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }), " ", item.stars] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(GitFork, { className: "w-3.5 h-3.5" }), " ", item.forks] }), item.version !== '-' && (jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: item.version }))] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [item.docs && (jsxRuntimeExports.jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }) })), jsxRuntimeExports.jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: jsxRuntimeExports.jsx(Download$1, { className: "w-4 h-4" }) }), jsxRuntimeExports.jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: jsxRuntimeExports.jsx(ExternalLink$1, { className: "w-4 h-4" }) })] })] })] }, item.name))) })] }, mod.category))) }) }), jsxRuntimeExports.jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u6210\u4E3A\u5F00\u6E90\u8D21\u732E\u8005" }), jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u65E0\u8BBA\u4F60\u662F\u7ECF\u9A8C\u4E30\u5BCC\u7684\u6C7D\u8F66\u8F6F\u4EF6\u5DE5\u7A0B\u5E08\uFF0C\u8FD8\u662F\u521A\u5165\u95E8\u7684\u7231\u597D\u8005\uFF0C YuleTech \u793E\u533A\u90FD\u6B22\u8FCE\u4F60\u7684\u8D21\u732E\u3002\u63D0\u4EA4\u4EE3\u7801\u3001\u62A5\u544A\u95EE\u9898\u3001\u5B8C\u5584\u6587\u6863\uFF0C \u4E0E\u6211\u4EEC\u4E00\u8D77\u6253\u9020\u4E2D\u56FD\u6700\u4F18\u79C0\u7684 AutoSAR \u5F00\u6E90\u751F\u6001\u3002" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [jsxRuntimeExports.jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u9605\u8BFB\u8D21\u732E\u6307\u5357" }), jsxRuntimeExports.jsx("button", { className: "px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20", children: "\u67E5\u770B\u5F85\u529E\u4EFB\u52A1" })] })] }) })] }));
}

const {useState} = await importShared('react');

const {Wrench,Download,ExternalLink,CheckCircle2,Settings,FileCode,Bug,TestTube,ArrowRight,Zap,Shield,Monitor} = await importShared('lucide-react');
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
function ToolchainPage() {
    const [activeCategory, setActiveCategory] = useState('全部');
    const filteredTools = activeCategory === '全部'
        ? tools
        : tools.filter((t) => t.category === activeCategory);
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen pt-16", children: [jsxRuntimeExports.jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" }), "\u5F00\u53D1\u5DE5\u5177\u94FE"] }), jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["\u4E00\u7AD9\u5F0F\u6C7D\u8F66\u8F6F\u4EF6", jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: " \u5F00\u53D1\u5DE5\u5177" })] }), jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u4ECE\u53EF\u89C6\u5316\u914D\u7F6E\u5230\u7F16\u8BD1\u6784\u5EFA\uFF0C\u4ECE\u8C03\u8BD5\u8BCA\u65AD\u5230\u6D4B\u8BD5\u9A8C\u8BC1\uFF0C YuleTech \u63D0\u4F9B\u5B8C\u6574\u7684 AutoSAR BSW \u5F00\u53D1\u5DE5\u5177\u94FE\uFF0C \u5E2E\u52A9\u5DE5\u7A0B\u5E08\u9AD8\u6548\u5B8C\u6210\u4ECE\u914D\u7F6E\u5230\u4EA7\u54C1\u7684\u5168\u6D41\u7A0B\u5F00\u53D1\u3002" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [jsxRuntimeExports.jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: [jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }), "\u4E0B\u8F7D\u5DE5\u5177\u96C6", jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }), "\u67E5\u770B\u6587\u6863"] })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12 border-y border-border bg-card/30", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: highlights.map((h) => (jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0", children: jsxRuntimeExports.jsx(h.icon, { className: "w-6 h-6 text-[hsl(var(--primary))]" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-1", children: h.title }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: h.desc })] })] }, h.title))) }) }) }), jsxRuntimeExports.jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories.map((cat) => (jsxRuntimeExports.jsx("button", { onClick: () => setActiveCategory(cat), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: cat }, cat))) }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: filteredTools.map((cat) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center border`, children: jsxRuntimeExports.jsx(cat.icon, { className: "w-5 h-5" }) }), jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: cat.category })] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: cat.items.map((tool) => (jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: tool.name }), tool.status === '已发布' ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3 h-3" }), " ", tool.status] })) : (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }), " ", tool.status] }))] }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 min-h-[2.5rem]", children: tool.desc }), jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "\u7248\u672C" }), jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: tool.version })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "\u5E73\u53F0" }), jsxRuntimeExports.jsx("span", { children: tool.platform })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "\u8BB8\u53EF" }), jsxRuntimeExports.jsx("span", { className: tool.free ? 'text-emerald-500' : 'text-[hsl(var(--accent))]', children: tool.free ? '永久免费' : '企业版' })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-4 border-t border-border", children: [jsxRuntimeExports.jsxs("button", { className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: [jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }), "\u4E0B\u8F7D"] }), jsxRuntimeExports.jsxs("button", { className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors border border-border", children: [jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }), "\u6587\u6863"] })] })] }, tool.name))) })] }, cat.category))) }) }), jsxRuntimeExports.jsx(ConfigGenerator, {}), jsxRuntimeExports.jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u5DE5\u5177\u94FE\u63D2\u4EF6\u751F\u6001" }), jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u6B22\u8FCE\u7B2C\u4E09\u65B9\u5F00\u53D1\u8005\u548C\u5DE5\u5177\u5382\u5546\u4E3A YuleTech \u5DE5\u5177\u94FE\u5F00\u53D1\u63D2\u4EF6\u3002 \u5B89\u5168\u52A0\u5BC6\u5DE5\u5177\u3001\u8BCA\u65AD\u63D2\u4EF6\u3001\u4EE3\u7801\u683C\u5F0F\u5316\u5DE5\u5177\u7B49\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7\u63D2\u4EF6\u5F62\u5F0F\u96C6\u6210\u5230\u6211\u4EEC\u7684\u5E73\u53F0\u3002" }), jsxRuntimeExports.jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u5F00\u53D1\u63D2\u4EF6" })] }) })] }));
}

export { OpenSourcePage as O, ToolchainPage as T };
