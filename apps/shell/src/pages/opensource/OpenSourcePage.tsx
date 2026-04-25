import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, GitFork, ChevronRight, Layers } from 'lucide-react';

export function OpenSourcePage() {
  // 保留 state 以备后续使用
  const [, _setActiveTab] = useState('overview');

  const layers = [
    { id: 'mcal', name: 'MCAL', nameZh: '微控制器驱动层', color: '#3b82f6' },
    { id: 'ecual', name: 'ECUAL', nameZh: 'ECU抽象层', color: '#10b981' },
    { id: 'services', name: 'Services', nameZh: '服务层', color: '#f59e0b' },
    { id: 'mcal_port', name: 'MCAL_PORT', nameZh: '移植层', color: '#8b5cf6' },
  ];

  const modules = [
    { id: 'port', name: 'Port', layer: 'mcal', status: 'stable', desc: '引脚配置驱动' },
    { id: 'dio', name: 'Dio', layer: 'mcal', status: 'stable', desc: '数字输入/输出驱动' },
    { id: 'icu', name: 'Icu', layer: 'ecual', status: 'beta', desc: '输入捕获单元驱动' },
    { id: 'can', name: 'Can', layer: 'services', status: 'alpha', desc: 'CAN通信驱动' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">开源代码</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              yuleASR <span className="text-[hsl(var(--accent))]">开源项目</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              基于 AutoSAR 标准的汽车基础软件开源实现，支持国产芯片移植。
              提供完整的 MCAL、ECUAL、Services 层实现。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/frisky1985/yuleASR"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors flex items-center gap-2"
              >
                <GitFork className="w-4 h-4" />
                查看源码
              </a>
              <Link
                to="/docs"
                className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                阅读文档
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-[hsl(var(--accent))]">50K+</div>
              <div className="text-sm text-muted-foreground mt-1">代码行数</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-[hsl(var(--accent))]">25+</div>
              <div className="text-sm text-muted-foreground mt-1">模块数量</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-[hsl(var(--accent))]">5+</div>
              <div className="text-sm text-muted-foreground mt-1">支持芯片平台</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-[hsl(var(--accent))]">Apache 2.0</div>
              <div className="text-sm text-muted-foreground mt-1">开源协议</div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">架构分层</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${layer.color}20` }}
                >
                  <Layers className="w-6 h-6" style={{ color: layer.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-1">{layer.name}</h3>
                <p className="text-sm text-muted-foreground">{layer.nameZh}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module List */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">模块列表</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className="p-4 bg-card rounded-lg border border-border hover:border-[hsl(var(--accent))] transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{module.name}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--accent))]" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{module.desc}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  module.status === 'stable' ? 'bg-green-500/10 text-green-500' :
                  module.status === 'beta' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {module.status === 'stable' ? '稳定版' : module.status === 'beta' ? '测试版' : '开发中'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
