import {
  Code2,
  Wrench,
  BookOpen,
  Cpu,
  Star,
  GitFork,
  CheckCircle2,
  Terminal,
  Settings,
  FileCode,
  Bug,
  Play,
  Video,
  FileText,
  Cpu as CpuIcon,
  MemoryStick,
  CircuitBoard,
  Layers,
  Database,
  Radio,
  Zap,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: '开源代码平台',
    description: '提供完整的 AutoSAR BSW 开源实现，包括 MCAL、ECUAL、Service 和 RTE 层，支持多种芯片平台。',
    image: '/images/feature-code.png',
    stats: '32 个模块',
    color: 'from-blue-500/20 to-cyan-500/20',
    accentColor: 'text-blue-500',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/20',
    link: '/opensource',
    preview: {
      github: { stars: 486, forks: 132 },
      completion: '56%',
      layers: [
        { name: 'MCAL', count: 9, icon: CpuIcon, done: 9, color: 'text-blue-500 bg-blue-500/10' },
        { name: 'ECUAL', count: 9, icon: Layers, done: 9, color: 'text-cyan-500 bg-cyan-500/10' },
        { name: 'Service', count: 5, icon: Database, done: 2, color: 'text-teal-500 bg-teal-500/10' },
        { name: 'RTE+ASW', count: 5, icon: Radio, done: 1, color: 'text-emerald-500 bg-emerald-500/10' },
      ],
      highlights: ['Mcu', 'Can', 'CanIf', 'PduR', 'Rte'],
    },
  },
  {
    icon: Wrench,
    title: '开发工具链',
    description: '可视化配置工具、代码生成器、编译脚本和调试工具，大幅降低汽车软件开发门槛。',
    image: '/images/feature-toolchain.png',
    stats: '免费使用',
    color: 'from-cyan-500/20 to-teal-500/20',
    accentColor: 'text-cyan-500',
    bgAccent: 'bg-cyan-500/10',
    borderAccent: 'border-cyan-500/20',
    link: '/toolchain',
    preview: {
      tools: [
        { name: 'BSW Configurator', icon: Settings, desc: '可视化模块配置', tag: '核心工具' },
        { name: 'RTE Generator', icon: FileCode, desc: '运行时环境代码生成', tag: '自动生成' },
        { name: 'Build Scripts', icon: Terminal, desc: 'CMake & Makefile 模板', tag: '编译' },
        { name: 'Trace Debugger', icon: Bug, desc: 'CAN/LIN 报文分析', tag: '调试' },
      ],
      platforms: ['i.MX8M Mini', 'RH850', 'AURIX TC3xx', 'S32K3'],
    },
  },
  {
    icon: BookOpen,
    title: '学习成长平台',
    description: '系统化的 AutoSAR 规范解读、视频课程、实战项目和专家问答，帮助工程师快速成长。',
    image: '/images/feature-learning.png',
    stats: '100+ 课程',
    color: 'from-teal-500/20 to-emerald-500/20',
    accentColor: 'text-teal-500',
    bgAccent: 'bg-teal-500/10',
    borderAccent: 'border-teal-500/20',
    link: '/learning',
    preview: {
      paths: [
        { name: 'AutoSAR 入门', level: '初级', lessons: 12, icon: Play },
        { name: 'MCAL 驱动开发', level: '中级', lessons: 18, icon: CpuIcon },
        { name: '通信栈实战', level: '高级', lessons: 15, icon: Zap },
      ],
      resources: { videos: 42, articles: 68, projects: 15 },
    },
  },
  {
    icon: Cpu,
    title: '硬件开发板',
    description: '开源硬件解决方案和评估开发板，支持 NXP、瑞萨、英飞凌等主流芯片，开箱即用。',
    image: '/images/feature-hardware.png',
    stats: '试用申请',
    color: 'from-emerald-500/20 to-green-500/20',
    accentColor: 'text-emerald-500',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/20',
    link: '/hardware',
    preview: {
      boards: [
        { name: 'YuleTech i.MX8M', chip: 'NXP i.MX8M Mini', specs: '4x A53 + M4', interfaces: 'CAN-FD x2, Ethernet' },
        { name: 'YuleTech RH850', chip: 'Renesas R7F7016', specs: 'G3MH Core', interfaces: 'CAN x4, LIN x2' },
      ],
      chips: [
        { name: 'i.MX8M Mini', vendor: 'NXP', icon: MemoryStick },
        { name: 'RH850/F1KM', vendor: 'Renesas', icon: CircuitBoard },
        { name: 'AURIX TC397', vendor: 'Infineon', icon: CpuIcon },
      ],
    },
  },
];

export function Features() {
  return (
    <section id="opensource" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] text-sm font-medium mb-4">
            核心平台
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            一站式汽车基础软件
            <span className="text-gradient-accent"> 开发生态</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            从开源代码到开发工具，从学习到实战，构建完整的汽车软件工程师成长体系
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-60`} />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                    {feature.stats}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Preview Content */}
                {feature.title === '开源代码平台' && (
                  <div className="space-y-3 mb-4">
                    {/* GitHub Stats */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-3.5 h-3.5" /> 486
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <GitFork className="w-3.5 h-3.5" /> 132
                      </span>
                      <span className="flex items-center gap-1 text-emerald-500">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 完成度 56%
                      </span>
                    </div>
                    {/* Layer badges */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'MCAL', count: 9, done: 9, color: 'text-blue-500 bg-blue-500/10' },
                        { name: 'ECUAL', count: 9, done: 9, color: 'text-cyan-500 bg-cyan-500/10' },
                        { name: 'Service', count: 5, done: 2, color: 'text-teal-500 bg-teal-500/10' },
                        { name: 'RTE+ASW', count: 5, done: 1, color: 'text-emerald-500 bg-emerald-500/10' },
                      ].map((layer) => (
                        <div key={layer.name} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${layer.color} text-xs`}>
                          <span className="font-medium">{layer.name}</span>
                          <span className="ml-auto opacity-80">{layer.done}/{layer.count}</span>
                        </div>
                      ))}
                    </div>
                    {/* Highlight modules */}
                    <div className="flex flex-wrap gap-1.5">
                      {['Mcu', 'Can', 'CanIf', 'PduR', 'Rte'].map((mod) => (
                        <span key={mod} className="px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {feature.title === '开发工具链' && (
                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'BSW Configurator', desc: '可视化模块配置' },
                        { name: 'RTE Generator', desc: '运行时环境代码生成' },
                        { name: 'Build Scripts', desc: 'CMake & Makefile 模板' },
                        { name: 'Trace Debugger', desc: 'CAN/LIN 报文分析' },
                      ].map((tool) => (
                        <div key={tool.name} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 border border-border/50">
                          <Settings className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-xs font-medium truncate">{tool.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{tool.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['i.MX8M Mini', 'RH850', 'AURIX TC3xx', 'S32K3'].map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-500">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {feature.title === '学习成长平台' && (
                  <div className="space-y-3 mb-4">
                    <div className="space-y-2">
                      {[
                        { name: 'AutoSAR 入门', level: '初级', lessons: 12 },
                        { name: 'MCAL 驱动开发', level: '中级', lessons: 18 },
                        { name: '通信栈实战', level: '高级', lessons: 15 },
                      ].map((path) => (
                        <div key={path.name} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border/50">
                          <div className="w-6 h-6 rounded-md bg-teal-500/10 flex items-center justify-center shrink-0">
                            <Play className="w-3.5 h-3.5 text-teal-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{path.name}</div>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {path.lessons} 节
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500">
                            {path.level}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Video className="w-3 h-3" /> 42 视频</span>
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> 68 文章</span>
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 15 项目</span>
                    </div>
                  </div>
                )}

                {feature.title === '硬件开发板' && (
                  <div className="space-y-3 mb-4">
                    <div className="space-y-2">
                      {[
                        { name: 'YuleTech i.MX8M', chip: 'NXP i.MX8M Mini', specs: '4x A53 + M4', interfaces: 'CAN-FD x2, Ethernet' },
                        { name: 'YuleTech RH850', chip: 'Renesas R7F7016', specs: 'G3MH Core', interfaces: 'CAN x4, LIN x2' },
                      ].map((board) => (
                        <div key={board.name} className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold">{board.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{board.chip}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{board.specs}</span>
                            <span className="text-border">|</span>
                            <span>{board.interfaces}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'i.MX8M Mini', vendor: 'NXP' },
                        { name: 'RH850/F1KM', vendor: 'Renesas' },
                        { name: 'AURIX TC397', vendor: 'Infineon' },
                      ].map((chip) => (
                        <div key={chip.name} className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-xs">
                          <CpuIcon className="w-3 h-3 text-emerald-500" />
                          <span className="font-medium text-emerald-500">{chip.vendor}</span>
                          <span className="text-muted-foreground">{chip.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={`#${feature.link}`}
                  className="mt-auto text-sm font-medium text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-glow))] transition-colors flex items-center gap-1 group/btn"
                >
                  了解更多
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
