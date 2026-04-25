import { useState } from 'react';
import { MessageSquare, Eye, Plus, Clock, Tag } from 'lucide-react';

export function ForumPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: '全部', count: 156 },
    { id: 'mcal', name: 'MCAL', count: 45 },
    { id: 'ecual', name: 'ECUAL', count: 38 },
    { id: 'services', name: 'Services', count: 42 },
    { id: 'tools', name: '工具', count: 31 },
  ];

  const topics = [
    {
      id: 1,
      title: 'Port 驱动配置疑问',
      author: '新人小王',
      replies: 12,
      views: 234,
      time: '2小时前',
      tags: ['MCAL', 'Port'],
      hot: true,
    },
    {
      id: 2,
      title: '分享：我们团队的 CAN 通信优化经验',
      author: '老驾驶员',
      replies: 28,
      views: 567,
      time: '5小时前',
      tags: ['Services', 'CAN'],
      hot: true,
    },
    {
      id: 3,
      title: 'yuleASR 配置工具怎么使用？',
      author: '学习者',
      replies: 8,
      views: 156,
      time: '1天前',
      tags: ['工具'],
      hot: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">技术论坛</h1>
          <button className="px-4 py-2 bg-[hsl(var(--accent))] text-white rounded-lg flex items-center gap-2 hover:bg-[hsl(var(--accent))]/90">
            <Plus className="w-4 h-4" />
            发布话题
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[hsl(var(--accent))] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="space-y-4 pb-16">
          {topics.map((topic) => (
            <div key={topic.id} className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {topic.hot && (
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs rounded-full">热门</span>
                    )}
                    <h3 className="font-semibold hover:text-[hsl(var(--accent))] cursor-pointer">
                      {topic.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{topic.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {topic.time}
                    </span>
                    <div className="flex gap-2">
                      {topic.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {topic.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {topic.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
