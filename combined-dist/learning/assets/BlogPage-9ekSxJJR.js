import { importShared } from './__federation_fn_import-CDE7MyXR.js';
import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';

const {useState: useState$2} = await importShared('react');

const {BookOpen: BookOpen$1,Play,Code2: Code2$1,MessageSquare: MessageSquare$1,Clock: Clock$2,Users,Star,ArrowRight: ArrowRight$2,CheckCircle2: CheckCircle2$1,Lock,Award,GraduationCap,Lightbulb} = await importShared('lucide-react');

const categories$1 = ['全部', '教程', '视频课程', '实战项目', '专家问答'];
const courses = [
    {
        category: '教程',
        icon: BookOpen$1,
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
        icon: Code2$1,
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
        icon: MessageSquare$1,
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
function LearningPage() {
    const [activeCategory, setActiveCategory] = useState$2('全部');
    const filteredCourses = activeCategory === '全部'
        ? courses
        : courses.filter((c) => c.category === activeCategory);
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [jsxRuntimeExports.jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [jsxRuntimeExports.jsx(BookOpen$1, { className: "w-4 h-4" }), "\u5B66\u4E60\u6210\u957F"] }), jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["\u5DE5\u7A0B\u5E08\u7684", jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: " \u6210\u957F\u5E73\u53F0" })] }), jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u7CFB\u7EDF\u5316\u7684 AutoSAR \u5B66\u4E60\u8DEF\u5F84\uFF0C\u4ECE\u5165\u95E8\u5230\u4E13\u5BB6\u3002 \u89C6\u9891\u8BFE\u7A0B\u3001\u5B9E\u6218\u9879\u76EE\u3001\u4E13\u5BB6\u95EE\u7B54\uFF0C\u5E2E\u52A9\u4F60\u5FEB\u901F\u6210\u957F\u4E3A\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u4E13\u5BB6\u3002" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [jsxRuntimeExports.jsxs("button", { className: "group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all", children: ["\u5F00\u59CB\u5B66\u4E60", jsxRuntimeExports.jsx(ArrowRight$2, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border", children: [jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }), "\u52A0\u5165\u5B66\u4E60\u5C0F\u7EC4"] })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-8 border-y border-border bg-card/30", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "100+" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u7CBE\u54C1\u8BFE\u7A0B" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "12,000+" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u5B66\u4E60\u4EBA\u6B21" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "45" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u5B9E\u6218\u9879\u76EE" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "320+" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u95EE\u9898\u5DF2\u89E3\u51B3" })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-16", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-4", children: "\u7CFB\u7EDF\u5316\u5B66\u4E60\u8DEF\u5F84" }), jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "\u4ECE\u96F6\u57FA\u7840\u5230\u4E13\u5BB6\uFF0C\u6211\u4EEC\u4E3A\u4E0D\u540C\u9636\u6BB5\u7684\u5B66\u4E60\u8005\u8BBE\u8BA1\u4E86\u6E05\u6670\u7684\u5B66\u4E60\u8DEF\u7EBF" })] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: learningPaths.map((path) => (jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-2xl p-6 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`, children: jsxRuntimeExports.jsx(path.icon, { className: "w-6 h-6 text-white" }) }), jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-4", children: path.title }), jsxRuntimeExports.jsx("div", { className: "space-y-3", children: path.steps.map((step, i) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground", children: i + 1 }), jsxRuntimeExports.jsx("span", { className: "text-sm", children: step }), jsxRuntimeExports.jsx(CheckCircle2$1, { className: "w-4 h-4 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })] }, step))) }), jsxRuntimeExports.jsx("button", { className: "mt-6 w-full py-2.5 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary))] hover:text-primary-foreground transition-all border border-border", children: "\u67E5\u770B\u8BE6\u60C5" })] }, path.title))) })] }) }), jsxRuntimeExports.jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories$1.map((cat) => (jsxRuntimeExports.jsx("button", { onClick: () => setActiveCategory(cat), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: cat }, cat))) }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: filteredCourses.map((cat) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center`, children: jsxRuntimeExports.jsx(cat.icon, { className: "w-5 h-5" }) }), jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: cat.category })] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: cat.items.map((item) => (jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold leading-snug", children: item.title }), item.free ? (jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2", children: "\u514D\u8D39" })) : (jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2", children: [jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 inline mr-0.5" }), "\u4F1A\u5458"] }))] }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 flex-1", children: item.desc }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: item.tags.map((tag) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag))) }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-4", children: [jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Clock$2, { className: "w-3.5 h-3.5" }), " ", item.duration] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }), " ", item.students] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-amber-500" }), " ", item.rating] })] }), jsxRuntimeExports.jsx("button", { className: "w-full py-2.5 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors", children: item.free ? '立即学习' : '查看详情' })] }, item.title))) })] }, cat.category))) }) }), jsxRuntimeExports.jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u6210\u4E3A YuleTech \u8BB2\u5E08" }), jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "\u5982\u679C\u4F60\u662F\u6C7D\u8F66\u57FA\u7840\u8F6F\u4EF6\u9886\u57DF\u7684\u4E13\u5BB6\uFF0C\u6B22\u8FCE\u52A0\u5165 YuleTech \u8BB2\u5E08\u56E2\u961F\uFF0C \u4E0E thousands of \u5DE5\u7A0B\u5E08\u5206\u4EAB\u4F60\u7684\u77E5\u8BC6\u548C\u7ECF\u9A8C\uFF0C\u540C\u65F6\u83B7\u5F97\u6536\u76CA\u5206\u6210\u3002" }), jsxRuntimeExports.jsx("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg", children: "\u7533\u8BF7\u6210\u4E3A\u8BB2\u5E08" })] }) })] }));
}

const {useState: useState$1} = await importShared('react');

const {BookOpen,Search: Search$1,CheckCircle2,Clock: Clock$1,ExternalLink,FileText: FileText$1,Code2,Layers,Cpu,Database,Radio,ChevronRight,ArrowRight: ArrowRight$1,AlertCircle} = await importShared('lucide-react');

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
    { title: '配置参数手册', desc: 'ARXML 配置参数详细说明', icon: FileText$1, color: 'text-teal-500' },
    { title: '错误码参考', desc: 'DET 错误码和运行时错误说明', icon: AlertCircle, color: 'text-amber-500' },
];
function DocsPage() {
    const [activeFilter, setActiveFilter] = useState$1('全部');
    const [searchQuery, setSearchQuery] = useState$1('');
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
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [jsxRuntimeExports.jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }), "\u6587\u6863\u4E2D\u5FC3"] }), jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["YuleTech BSW", jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: " \u5F00\u53D1\u6587\u6863" })] }), jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u5B8C\u6574\u7684 AutoSAR BSW \u6A21\u5757 API \u6587\u6863\u3001\u914D\u7F6E\u6307\u5357\u548C\u5F00\u53D1\u624B\u518C\u3002 \u4ECE MCAL \u9A71\u52A8\u5230 RTE \u63A5\u53E3\uFF0C\u5E2E\u52A9\u4F60\u5FEB\u901F\u4E0A\u624B\u9879\u76EE\u5F00\u53D1\u3002" }), jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto relative", children: [jsxRuntimeExports.jsx(Search$1, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), jsxRuntimeExports.jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6A21\u5757\u3001API\u3001\u914D\u7F6E\u53C2\u6570...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50 shadow-elegant" })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-8 border-y border-border bg-card/30", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: totalModules }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u6587\u6863\u6A21\u5757" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: totalApis }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "API \u63A5\u53E3" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: completedModules }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u5DF2\u5B8C\u6210\u6587\u6863" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "92%" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u6574\u4F53\u8986\u76D6\u7387" })] })] }) }) }), !searchQuery && activeFilter === '全部' && (jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-6", children: "\u5FEB\u901F\u5165\u53E3" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: quickLinks.map((link) => (jsxRuntimeExports.jsx("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant cursor-pointer", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0", children: jsxRuntimeExports.jsx(link.icon, { className: `w-5 h-5 ${link.color}` }) }), jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1 group-hover:text-[hsl(var(--accent))] transition-colors", children: link.title }), jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: link.desc })] }), jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors flex-shrink-0 mt-1" })] }) }, link.title))) })] }) })), jsxRuntimeExports.jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: layerFilters.map((filter) => (jsxRuntimeExports.jsx("button", { onClick: () => setActiveFilter(filter), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: filter }, filter))) }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [filteredModules.length === 0 && (jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }), jsxRuntimeExports.jsx("p", { children: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u6587\u6863" })] })), filteredModules.map((mod) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-lg ${mod.color} flex items-center justify-center border`, children: jsxRuntimeExports.jsx(mod.icon, { className: "w-5 h-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: mod.layer }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: mod.desc })] }), jsxRuntimeExports.jsxs("span", { className: `ml-auto px-3 py-1 rounded-full text-xs font-medium ${mod.badgeColor}`, children: [mod.items.length, " \u6A21\u5757"] })] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: mod.items.map((item) => (jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: [jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-lg", children: item.name }), item.status === '已完成' ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3 h-3" }), " ", item.status] })) : item.status === '开发中' || item.status === '头文件完成' ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(Clock$1, { className: "w-3 h-3" }), " ", item.status] })) : (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [jsxRuntimeExports.jsx(Clock$1, { className: "w-3 h-3" }), " ", item.status] }))] }) }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 min-h-[2.5rem]", children: item.desc }), jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "API \u6570\u91CF" }), jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: item.apis })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "\u6587\u6863\u8986\u76D6\u7387" }), jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [item.coverage, "%"] })] }), jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: jsxRuntimeExports.jsx("div", { className: `h-full rounded-full transition-all ${item.coverage === 100
                                                                ? 'bg-emerald-500'
                                                                : item.coverage >= 60
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-muted-foreground/30'}`, style: { width: `${item.coverage}%` } }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: item.version }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-medium hover:bg-[hsl(var(--primary))] hover:text-primary-foreground transition-colors border border-border", children: [jsxRuntimeExports.jsx(FileText$1, { className: "w-3.5 h-3.5" }), "API \u6587\u6863"] }), jsxRuntimeExports.jsx("button", { className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]", children: jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }) })] })] })] }, item.name))) })] }, mod.layer)))] }) }), jsxRuntimeExports.jsx("section", { className: "py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]", children: jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "\u5B8C\u5584\u6587\u6863\uFF0C\u5E2E\u52A9\u66F4\u591A\u5F00\u53D1\u8005" }), jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-8 max-w-2xl mx-auto", children: "YuleTech \u7684\u6587\u6863\u8D28\u91CF\u79BB\u4E0D\u5F00\u793E\u533A\u8D21\u732E\u3002\u65E0\u8BBA\u662F\u8865\u5145 API \u8BF4\u660E\u3001\u4FEE\u6B63\u9519\u8BEF\uFF0C\u8FD8\u662F\u7FFB\u8BD1\u5185\u5BB9\uFF0C \u6BCF\u4E00\u4EFD\u8D21\u732E\u90FD\u80FD\u8BA9\u6587\u6863\u66F4\u52A0\u5B8C\u5584\uFF0C\u5E2E\u52A9\u66F4\u591A\u5DE5\u7A0B\u5E08\u5FEB\u901F\u4E0A\u624B\u3002" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [jsxRuntimeExports.jsxs("button", { className: "px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2", children: [jsxRuntimeExports.jsx(FileText$1, { className: "w-4 h-4" }), "\u53C2\u4E0E\u6587\u6863\u8D21\u732E"] }), jsxRuntimeExports.jsxs("button", { className: "px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2", children: [jsxRuntimeExports.jsx(ArrowRight$1, { className: "w-4 h-4" }), "\u67E5\u770B\u6587\u6863\u89C4\u8303"] })] })] }) })] }));
}

const {useState} = await importShared('react');

const {FileText,Search,Clock,Eye,ThumbsUp,MessageSquare,TrendingUp,ArrowRight,Flame} = await importShared('lucide-react');

const categories = ['全部', 'MCAL', 'ECUAL', 'Service', '工具链', '功能安全', '架构设计'];
const hotTags = ['AutoSAR', 'CAN', 'i.MX8M', 'UDS', 'MCAL', 'RTE', '功能安全', '诊断', '配置工具', 'Docker', 'MISRA', '多核'];
const articlesData = [
    {
        id: 'blog-1',
        title: 'AutoSAR BSW 分层架构深度解析：从 MCAL 到 RTE 的完整数据流',
        desc: '本文深入剖析 AutoSAR Classic Platform 的软件分层架构，详细讲解从微控制器驱动层（MCAL）到运行时环境（RTE）的完整数据流动路径，结合 YuleTech 开源实现进行代码级解读。',
        author: '李架构',
        avatar: '李架',
        role: '首席架构师',
        date: '2026-04-20',
        readTime: '15 分钟',
        views: 3420,
        likes: 128,
        comments: 36,
        tags: ['架构设计', 'AutoSAR', 'BSW'],
        category: '架构设计',
        hot: true,
    },
    {
        id: 'blog-2',
        title: 'i.MX8M Mini CAN FD 驱动开发实战：从寄存器到 AutoSAR 接口',
        desc: '手把手讲解如何在 i.MX8M Mini 上实现 CAN FD 驱动，从 FlexCAN 寄存器配置到 AutoSAR Can 模块的完整对接流程。',
        author: '张明',
        avatar: '张明',
        role: '嵌入式工程师',
        date: '2026-04-19',
        readTime: '12 分钟',
        views: 1860,
        likes: 72,
        comments: 18,
        tags: ['MCAL', 'CAN', 'i.MX8M'],
        category: 'MCAL',
        hot: true,
    },
    {
        id: 'blog-3',
        title: 'CanIf 模块配置最佳实践：信号路由与 PDU 映射',
        desc: '总结 CanIf 模块在实际项目中的配置经验，包括 HOH 配置、PDU 路由表设计、以及 Upper Layer 接口对接要点。',
        author: '李华',
        avatar: '李华',
        role: '软件架构师',
        date: '2026-04-18',
        readTime: '10 分钟',
        views: 1540,
        likes: 58,
        comments: 14,
        tags: ['ECUAL', 'CanIf', '配置'],
        category: 'ECUAL',
        hot: true,
    },
    {
        id: 'blog-4',
        title: 'AutoSAR Com 模块信号打包与解包机制详解',
        desc: '深入讲解 Com 模块的信号（Signal）和信号组（Signal Group）打包机制，包括字节序、对齐方式和更新位处理。',
        author: '王强',
        avatar: '王强',
        role: '通信工程师',
        date: '2026-04-17',
        readTime: '18 分钟',
        views: 1200,
        likes: 45,
        comments: 9,
        tags: ['Service', 'Com', '通信'],
        category: 'Service',
        hot: false,
    },
    {
        id: 'blog-5',
        title: 'YuleConfig 工具链插件开发入门指南',
        desc: '介绍 YuleTech 配置工具链的插件架构，如何开发自定义模块配置界面和代码生成器。',
        author: '刘洋',
        avatar: '刘洋',
        role: 'DevOps工程师',
        date: '2026-04-16',
        readTime: '8 分钟',
        views: 980,
        likes: 38,
        comments: 7,
        tags: ['工具链', 'YuleConfig', '插件'],
        category: '工具链',
        hot: false,
    },
    {
        id: 'blog-6',
        title: 'ISO 26262 功能安全在 AutoSAR BSW 中的实现要点',
        desc: '从 ASIL 等级划分到 E2E 保护，系统讲解功能安全要求在基础软件各层级的实现策略。',
        author: '陈工',
        avatar: '陈工',
        role: '功能安全工程师',
        date: '2026-04-15',
        readTime: '20 分钟',
        views: 2100,
        likes: 89,
        comments: 22,
        tags: ['功能安全', 'ISO 26262', 'E2E'],
        category: '功能安全',
        hot: true,
    },
];
const weeklyTop = [
    { title: 'AutoSAR BSW 分层架构深度解析：从 MCAL 到 RTE 的完整数据流', views: 3420 },
    { title: 'ISO 26262 功能安全在 AutoSAR BSW 中的实现要点', views: 2100 },
    { title: 'i.MX8M Mini CAN FD 驱动开发实战：从寄存器到 AutoSAR 接口', views: 1860 },
];
function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('全部');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredArticles = articlesData.filter((a) => {
        const matchCategory = activeCategory === '全部' || a.category === activeCategory;
        const matchSearch = searchQuery === '' ||
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchCategory && matchSearch;
    });
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [jsxRuntimeExports.jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }), "\u6280\u672F\u535A\u5BA2"] }), jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: ["AutoSAR", jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: " \u6280\u672F\u4E13\u680F" })] }), jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "\u7531 YuleTech \u6280\u672F\u56E2\u961F\u548C\u793E\u533A\u4E13\u5BB6\u64B0\u5199\u7684\u6DF1\u5EA6\u6280\u672F\u6587\u7AE0\uFF0C\u6DB5\u76D6 AutoSAR BSW \u5404\u5C42\u7EA7\u7684 \u5F00\u53D1\u5B9E\u8DF5\u3001\u67B6\u6784\u8BBE\u8BA1\u4E0E\u6027\u80FD\u4F18\u5316\u7ECF\u9A8C\u3002" }), jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto relative", children: [jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), jsxRuntimeExports.jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6587\u7AE0\u3001\u6807\u7B7E\u3001\u4F5C\u8005...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50 shadow-elegant" })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-8 border-y border-border bg-card/30", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "120+" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u6280\u672F\u6587\u7AE0" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "35" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u793E\u533A\u4F5C\u8005" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "85,000+" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u6708\u5EA6\u9605\u8BFB" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "2,400+" }), jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "\u4E92\u52A8\u8BA8\u8BBA" })] })] }) }) }), !searchQuery && activeCategory === '全部' && (jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-[hsl(var(--accent))]" }), jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "\u7F16\u8F91\u63A8\u8350" })] }), jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: articlesData[0].tags.map((tag) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag))) }), jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-bold mb-3 hover:text-[hsl(var(--accent))] transition-colors cursor-pointer", children: articlesData[0].title }), jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: articlesData[0].desc }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-bold", children: articlesData[0].avatar }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: articlesData[0].author }), jsxRuntimeExports.jsx("span", { className: "text-xs ml-1", children: articlesData[0].role })] })] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }), " ", articlesData[0].readTime] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }), " ", articlesData[0].views] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3.5 h-3.5" }), " ", articlesData[0].likes] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }), " ", articlesData[0].comments] })] })] }), jsxRuntimeExports.jsx("div", { className: "lg:w-48 flex-shrink-0 flex items-center", children: jsxRuntimeExports.jsxs("button", { className: "w-full lg:w-auto px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all flex items-center justify-center gap-2", children: ["\u9605\u8BFB\u5168\u6587", jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })] }) })] }) })] }) })), jsxRuntimeExports.jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories.map((cat) => (jsxRuntimeExports.jsx("button", { onClick: () => setActiveCategory(cat), className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: cat }, cat))) }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: searchQuery ? `搜索结果："${searchQuery}"` : activeCategory === '全部' ? '最新文章' : `${activeCategory} 文章` }), jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: ["\u5171 ", filteredArticles.length, " \u7BC7"] })] }), filteredArticles.length === 0 && (jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }), jsxRuntimeExports.jsx("p", { children: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u6587\u7AE0" })] })), filteredArticles.map((article) => (jsxRuntimeExports.jsx("div", { className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: jsxRuntimeExports.jsx("div", { className: "flex items-start gap-4", children: jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [article.hot && (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full text-xs font-medium", children: [jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3" }), "\u70ED\u95E8"] })), jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: article.category })] }), jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2 group-hover:text-[hsl(var(--accent))] transition-colors cursor-pointer", children: article.title }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 line-clamp-2", children: article.desc }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: article.tags.map((tag) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag))) }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-[10px] font-bold", children: article.avatar }), jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: article.author })] }), jsxRuntimeExports.jsx("span", { children: article.date }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }), " ", article.readTime] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }), " ", article.views] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }), " ", article.likes] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }), " ", article.comments] })] })] }) }) }, article.id)))] }), jsxRuntimeExports.jsxs("div", { className: "lg:w-80 space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "\u70ED\u95E8\u6807\u7B7E" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: hotTags.map((tag) => (jsxRuntimeExports.jsx("button", { onClick: () => setSearchQuery(tag), className: "px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))] transition-colors", children: tag }, tag))) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "\u672C\u5468\u70ED\u9605" }), jsxRuntimeExports.jsx("div", { className: "space-y-3", children: weeklyTop.map((article, index) => (jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 group cursor-pointer", children: [jsxRuntimeExports.jsx("span", { className: `flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${index < 3 ? 'bg-[hsl(var(--accent))] text-white' : 'bg-muted text-muted-foreground'}`, children: index + 1 }), jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium line-clamp-2 group-hover:text-[hsl(var(--accent))] transition-colors", children: article.title }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 inline mr-1" }), article.views.toLocaleString(), " \u9605\u8BFB"] })] })] }, index))) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl p-5 text-white", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "\u8BA2\u9605\u6280\u672F\u5468\u520A" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 mb-4", children: "\u6BCF\u5468\u83B7\u53D6\u6700\u65B0 AutoSAR \u6280\u672F\u6587\u7AE0\u548C\u793E\u533A\u52A8\u6001" }), jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [jsxRuntimeExports.jsx("input", { type: "email", placeholder: "\u8F93\u5165\u90AE\u7BB1\u5730\u5740", className: "w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" }), jsxRuntimeExports.jsx("button", { className: "w-full py-2 bg-white text-[hsl(var(--primary))] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors", children: "\u8BA2\u9605" })] })] })] })] }) }) })] }));
}

export { BlogPage as B, DocsPage as D, LearningPage as L };
