import { useState } from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: '总用户数', value: '2,847', change: '+12%', icon: Users },
    { label: '文章数量', value: '156', change: '+5%', icon: FileText },
    { label: '话题讨论', value: '342', change: '+18%', icon: Activity },
    { label: '日活跃用户', value: '892', change: '+8%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
          <div className="flex items-center gap-2 px-4 py-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <span className="font-bold">YuleTech 管理</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: '总览', icon: LayoutDashboard },
              { id: 'users', label: '用户管理', icon: Users },
              { id: 'content', label: '内容管理', icon: FileText },
              { id: 'settings', label: '系统设置', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[hsl(var(--accent))] text-white'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              to="/admin/login"
              className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              退出登录
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">管理后台</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">管理员</span>
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <span className="font-bold text-sm">A</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">最近活动</h2>
            <div className="space-y-4">
              {[
                { action: '新用户注册', user: '小王', time: '2分钟前' },
                { action: '发布文章', user: '张老师', time: '15分钟前' },
                { action: '回复话题', user: '李工程师', time: '30分钟前' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-muted-foreground"> - {activity.user}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
