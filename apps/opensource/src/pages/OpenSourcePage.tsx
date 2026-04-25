import { useState } from 'react';
import {
  Star,
  GitFork,
  ExternalLink,
  BookOpen,
  Download,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Database,
  Radio,
  Search,
  ArrowRight,
} from 'lucide-react';

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
      items: m.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.includes(searchQuery)
      ),
    }))
    .filter((m) => m.items.length > 0);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              开源项目
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AutoSAR BSW
              <span className="text-gradient-accent"> 开源代码</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              基于 AutoSAR Classic Platform 4.x 标准，为 NXP i.MX8M Mini 处理器构建完整的 BSW 栈。
              从底层驱动到应用组件，全部开源，永久免费。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all">
                <GitFork className="w-4 h-4" />
                Fork 全部代码
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all border border-border">
                <BookOpen className="w-4 h-4" />
                贡献指南
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">32</div>
              <div className="text-sm text-muted-foreground">开源模块</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">18</div>
              <div className="text-sm text-muted-foreground">已完成</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">5</div>
              <div className="text-sm text-muted-foreground">开发中</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">9</div>
              <div className="text-sm text-muted-foreground">规划中</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {layerFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter
                      ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索模块..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Module Lists */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredModules.map((mod) => (
            <div key={mod.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg ${mod.color} flex items-center justify-center border`}>
                  <mod.icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{mod.category}</h2>
                  <p className="text-sm text-muted-foreground">{mod.desc}</p>
                </div>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${mod.badgeColor}`}>
                  {mod.items.length} 模块
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mod.items.map((item) => (
                  <div
                    key={item.name}
                    className="group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-semibold text-lg">{item.name}</span>
                        {item.status === '已完成' ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> 已完成
                          </span>
                        ) : item.status === '开发中' ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" /> 开发中
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" /> 规划中
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" /> {item.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" /> {item.forks}
                        </span>
                        {item.version !== '-' && (
                          <span className="font-mono text-xs">{item.version}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.docs && (
                          <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]">
                            <BookOpen className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-[hsl(var(--accent))]">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribution CTA */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">成为开源贡献者</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            无论你是经验丰富的汽车软件工程师，还是刚入门的爱好者，
            YuleTech 社区都欢迎你的贡献。提交代码、报告问题、完善文档，
            与我们一起打造中国最优秀的 AutoSAR 开源生态。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-white text-[hsl(var(--primary))] rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg">
              阅读贡献指南
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
              查看待办任务
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
