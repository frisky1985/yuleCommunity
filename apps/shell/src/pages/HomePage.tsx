import { Link } from 'react-router-dom';
import { Code2, BookOpen, Users, Download } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8">
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-medium">国内首个 AutoSAR BSW 开源社区</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            开源汽车基础软件
            <br />
            <span className="text-[hsl(var(--accent))]">打造国产芯片生态</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            为汽车电子工程师提供高质量的 AutoSAR BSW 开源代码、开发工具链和技术社区。
            让每一位工程师都能掌握核心技术，推动行业发展。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/opensource"
              className="px-8 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg font-medium hover:bg-[hsl(var(--primary-glow))] transition-colors"
            >
              浏览开源代码
            </Link>
            <Link
              to="/docs"
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              阅读文档
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">社区核心功能</h2>
            <p className="text-muted-foreground">提供全方位的 AutoSAR BSW 开发支持</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="开源代码"
              description="32+ 精选 AutoSAR BSW 模块，覆盖 MCAL/ECUAL/Service 层"
              href="/opensource"
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="学习路径"
              description="从入门到精通的系统课程，助你掌握 AutoSAR 开发"
              href="/learning"
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="技术社区"
              description="与数千名工程师交流，解决实际开发问题"
              href="/community"
            />
            <FeatureCard
              icon={<Download className="w-6 h-6" />}
              title="工具链"
              description="完善的开发工具链和配置生成器"
              href="/toolchain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, href }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  href: string;
}) {
  return (
    <Link to={href} className="block p-6 bg-card rounded-xl border border-border hover:border-[hsl(var(--accent))] transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
