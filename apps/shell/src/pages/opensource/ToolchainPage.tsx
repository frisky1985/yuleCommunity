import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Download, Settings, Code2, ChevronRight } from 'lucide-react';

export function ToolchainPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'config-gen',
      name: 'ConfigGenerator',
      desc: 'AutoSAR 配置生成工具',
      features: ['可视化配置', '代码生成', '校验检查'],
    },
    {
      id: 'debugger',
      name: 'yuleTrace',
      desc: '在线调试工具',
      features: ['实时追踪', '日志分析', '性能监控'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Wrench className="w-4 h-4" />
            <span className="text-sm font-medium">开发工具</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            完整的 <span className="text-[hsl(var(--accent))]">开发工具链</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            提供从配置到调试的全流程工具支持，加速 AutoSAR 开发效率
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-[hsl(var(--accent))]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 bg-muted rounded-lg text-sm font-medium hover:bg-[hsl(var(--accent))] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  下载工具
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
