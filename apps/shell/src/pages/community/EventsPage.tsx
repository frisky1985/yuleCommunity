import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';

export function EventsPage() {
  const [filter, setFilter] = useState('upcoming');

  const events = [
    {
      id: 1,
      title: 'YuleTech 线下技术沙龙',
      type: 'offline',
      date: '2026-05-15',
      time: '14:00-17:00',
      location: '上海市浦东新区',
      participants: 45,
      maxParticipants: 50,
      status: 'registering',
    },
    {
      id: 2,
      title: 'AutoSAR 基础入门在线课堂',
      type: 'online',
      date: '2026-04-30',
      time: '20:00-21:30',
      location: '腾讯会议',
      participants: 156,
      maxParticipants: 200,
      status: 'registering',
    },
    {
      id: 3,
      title: 'yuleASR v2.0 发布会',
      type: 'online',
      date: '2026-04-20',
      time: '19:00-20:30',
      location: 'B 站直播',
      participants: 89,
      maxParticipants: 500,
      status: 'ended',
    },
  ];

  const filteredEvents = events.filter((e) => {
    if (filter === 'upcoming') return e.status === 'registering';
    if (filter === 'ended') return e.status === 'ended';
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">社区活动</h1>
          <p className="text-muted-foreground">线上线下技术活动，学习交流成长</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'upcoming', label: '即将举行' },
            { id: 'all', label: '全部活动' },
            { id: 'ended', label: '已结束' },
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

        {/* Events */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-[hsl(var(--accent))] transition-colors">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.type === 'online' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {event.type === 'online' ? '线上活动' : '线下活动'}
                  </span>
                  {event.status === 'ended' && (
                    <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">已结束</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-4">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.participants}/{event.maxParticipants} 人参加
                  </div>
                </div>
                <button className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-1 ${
                  event.status === 'ended'
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent))]/90'
                }`}>
                  {event.status === 'ended' ? '查看回顾' : '立即报名'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
