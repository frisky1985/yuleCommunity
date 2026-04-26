import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutGrid, Minimize2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { DailyCodeWidget } from '../components/DailyCodeWidget';
import { Stats } from '../components/Stats';
import { OpenSource } from '../components/OpenSource';
import { Community } from '../components/Community';
import { CTA } from '../components/CTA';

const MINIMAL_MODE_KEY = 'yule-minimal-mode';

export function HomePage() {
  const [isMinimalMode, setIsMinimalMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(MINIMAL_MODE_KEY);
    if (saved) {
      setIsMinimalMode(saved === 'true');
    }
    setIsLoaded(true);
  }, []);

  const toggleMinimalMode = () => {
    const newMode = !isMinimalMode;
    setIsMinimalMode(newMode);
    localStorage.setItem(MINIMAL_MODE_KEY, String(newMode));
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>YuleTech - 汽车基础软件开源社区 | AutoSAR BSW</title>
        <meta name="description" content="YuleTech 是国内领先的汽车基础软件开源社区，提供 AutoSAR BSW 开源代码、开发工具链、学习成长平台和硬件开发板。" />
      </Helmet>

      {/* Minimal Mode Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMinimalMode}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full shadow-lg
            transition-all duration-300 hover:scale-105
            ${isMinimalMode 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card text-foreground border border-border hover:border-primary/50'
            }
          `}
          title={isMinimalMode ? '退出极简模式' : '进入极简模式'}
        >
          {isMinimalMode ? (
            <>
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium">完整模式</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-4 h-4" />
              <span className="text-sm font-medium">极简模式</span>
            </>
          )}
        </button>
      </div>

      <Hero />
      <Features />
      
      {!isMinimalMode && (
        <>
          <DailyCodeWidget />
          <Stats />
          <OpenSource />
          <Community />
          <CTA />
        </>
      )}
    </>
  );
}
