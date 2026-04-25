import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, FileText, Users, Clock, ChevronRight } from 'lucide-react';

export function LearningPage() {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: 'AutoSAR 基础入门',
      desc: '从零学习 AutoSAR 架构和开发流程',
      level: '入门',
      duration: '12小时',
      students: 1250,
    },
    {
      id: 2,
      title: 'MCAL 开发实践',
      desc: '深入讲解微控制器驱动开发',
      level: '进阶',
      duration: '20小时',
      students: 890,
    },
  ];

  const tutorials = [
    { id: 1, title: 'Port 驱动配置详解', category: 'MCAL', readTime: '15分钟' },
    { id: 2, title: 'Dio 中断处理机制', category: 'MCAL', readTime: '20分钟' },
    { id: 3, title: 'CAN 通信协议实现', category: 'Services', readTime: '30分钟' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">学习成长</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            系统化学习 <span className="text-[hsl(var(--accent))]">AutoSAR 技术</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            从入门到精通，提供完整的学习路径。视频课程、技术文档、实战项目，
            帮助你快速掌握汽车基础软件开发。
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 border-y border-border">
        <div className="max-w-7xl mx-auto flex justify-center gap-8">
          {[
            { id: 'courses', label: '视频课程', icon: Video },
            { id: 'tutorials', label: '教程文档', icon: FileText },
            { id: 'docs', label: '技术文档', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[hsl(var(--accent))] text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'courses' && (
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground">{course.desc}</p>
                    </div>
                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students} 人学习
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tutorials' && (
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="p-4 bg-card rounded-lg border border-border hover:border-[hsl(var(--accent))] transition-colors flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{tutorial.title}</h3>
                    <span className="text-sm text-muted-foreground">{tutorial.category} · {tutorial.readTime}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">文档中心</h3>
              <p className="text-muted-foreground mb-6">查看完整的 API 文档和开发指南</p>
              <Link to="/docs" className="px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors">
                浏览文档
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
