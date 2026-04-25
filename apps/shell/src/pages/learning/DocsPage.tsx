import { Search, FileText } from 'lucide-react';
import { useState } from 'react';

export function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const docs = [
    { title: '快速入门指南', category: '开始', desc: '5分钟了解 yuleASR 项目结构和开发环境搭建' },
    { title: 'AutoSAR 架构概览', category: '架构', desc: '深入理解 AutoSAR 分层架构和模块交互' },
    { title: 'MCAL 开发指南', category: 'MCAL', desc: '微控制器驱动开发的完整文档' },
    { title: 'ECUAL 开发指南', category: 'ECUAL', desc: 'ECU 抽象层驱动开发说明' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">文档中心</h1>
          <p className="text-muted-foreground mb-8">完整的 API 文档、开发指南和教程</p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索文档..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-[hsl(var(--accent))]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pb-16">
          {docs.map((doc) => (
            <div key={doc.title} className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[hsl(var(--accent))] font-medium">{doc.category}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}