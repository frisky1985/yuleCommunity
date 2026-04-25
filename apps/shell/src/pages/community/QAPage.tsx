import { useState } from 'react';
import { HelpCircle, MessageCircle, Check, ThumbsUp, Clock, Tag } from 'lucide-react';

export function QAPage() {
  const [filter, setFilter] = useState('all');

  const questions = [
    {
      id: 1,
      title: 'Port 驱动配置中的 Pin号映射问题',
      desc: '在配置 Port 驱动时，不确定如何正确映射引脚号到 PortPinId...',
      author: '新手小明',
      answers: 3,
      views: 89,
      solved: true,
      time: '3小时前',
      tags: ['MCAL', 'Port'],
    },
    {
      id: 2,
      title: 'CAN 通信数据丢失问题',
      desc: '在高负载情况下发现 CAN 消息丢失，请问是哪里配置错误...',
      author: '开发老李',
      answers: 5,
      views: 234,
      solved: false,
      time: '1天前',
      tags: ['Services', 'CAN'],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">技术问答</h1>
          <p className="text-muted-foreground">提出问题，获取社区专家的解答</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'all', label: '全部问题' },
            { id: 'unsolved', label: '待解决' },
            { id: 'solved', label: '已解决' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f.id
                  ? 'bg-[hsl(var(--accent))] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-4 pb-16">
          {questions.map((q) => (
            <div key={q.id} className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                  q.solved ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {q.solved ? <Check className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                  <span className="text-xs mt-0.5">{q.solved ? '已解决' : '待解决'}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 hover:text-[hsl(var(--accent))] cursor-pointer">
                    {q.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{q.desc}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex gap-2">
                      {q.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent rounded">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {q.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {q.answers} 回答
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {q.views} 浏览
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
