import { Users, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

export function CommunityPage() {
  const stats = [
    { label: '注册用户', value: '2,800+', icon: Users },
    { label: '话题讨论', value: '1,500+', icon: MessageSquare },
    { label: '活动举办', value: '50+', icon: Calendar },
    { label: '贡献者', value: '120+', icon: TrendingUp },
  ];

  const topics = [
    { title: 'AutoSAR 配置工具使用问题', replies: 32, views: 456 },
    { title: 'MCAL Port 驱动移植经验分享', replies: 28, views: 389 },
    { title: 'CAN 通信协议实现疑问', replies: 45, views: 567 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">技术社区</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            加入 <span className="text-[hsl(var(--accent))]">YuleTech</span> 社区
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            与 2,800+ 汽车软件工程师交流学习、分享经验、协作开发
          </p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 bg-card rounded-xl border border-border text-center">
              <stat.icon className="w-8 h-8 text-[hsl(var(--accent))] mx-auto mb-3" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">热门话题</h2>
          <div className="space-y-4">
            {topics.map((topic, idx) => (
              <div key={idx} className="p-4 bg-card rounded-lg border border-border hover:border-[hsl(var(--accent))] transition-colors">
                <h3 className="font-medium mb-2">{topic.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{topic.replies} 回复</span>
                  <span>{topic.views} 浏览</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
