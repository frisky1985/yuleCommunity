import { useState } from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

export function BlogPage() {
  const [filter, setFilter] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'AutoSAR 软件架构深度解析',
      excerpt: '本文深入剖析 AutoSAR Classic Platform 的软件分层架构，详细讲解从微控制器驱动层到运行时环境的完整数据流动路径...',
      author: '张工程师',
      date: '2026-04-20',
      readTime: '15 分钟',
      category: '架构',
    },
    {
      id: 2,
      title: 'yuleASR OS 模块实现原理',
      excerpt: '基于 FreeRTOS 的 AutoSAR OS 实现，讲解任务调度、事件通知和资源管理的具体实现...',
      author: '李架构师',
      date: '2026-04-15',
      readTime: '20 分钟',
      category: '模块开发',
    },
    {
      id: 3,
      title: '国产芯片移植经验分享',
      excerpt: '针对国产 MCU 的 MCAL 移植经验，包括时钟配置、中断处理和外设驱动适配...',
      author: '王移植专家',
      date: '2026-04-10',
      readTime: '25 分钟',
      category: '移植',
    },
  ];

  const categories = ['all', '架构', '模块开发', '移植'];

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">技术博客</h1>
          <p className="text-muted-foreground">深度技术文章，分享汽车软件开发经验</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-[hsl(var(--accent))] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="grid gap-6 pb-16">
          {filteredArticles.map((article) => (
            <article key={article.id} className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="px-2 py-1 bg-accent/10 text-accent rounded">{article.category}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-muted-foreground mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <button className="flex items-center gap-1 text-[hsl(var(--accent))] font-medium hover:underline">
                  阅读全文
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
