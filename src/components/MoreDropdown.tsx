import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Settings, Wrench, FileText, HelpCircle, BookOpen, Cpu, Download, Calendar } from 'lucide-react';

const moreGroups = [
  {
    label: '🛠️ 开发工具',
    items: [
      { label: 'ASR配置', to: '/yuleasr', icon: Settings },
      { label: '工具链', to: '/toolchain', icon: Wrench },
    ],
  },
  {
    label: '📚 资源中心',
    items: [
      { label: '文档中心', to: '/docs', icon: FileText },
      { label: '问答', to: '/qa', icon: HelpCircle },
      { label: '技术博客', to: '/blog', icon: BookOpen },
    ],
  },
  {
    label: '🔧 硬件生态',
    items: [
      { label: '开发板', to: '/hardware', icon: Cpu },
      { label: '下载中心', to: '/downloads', icon: Download },
    ],
  },
  {
    label: '📅 社区活动',
    items: [
      { label: '活动', to: '/events', icon: Calendar },
    ],
  },
];

export function MoreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        更多 <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl p-2 z-50">
          {moreGroups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="h-px bg-border my-1" />}
              <div className="px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {group.label}
              </div>
              {group.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
