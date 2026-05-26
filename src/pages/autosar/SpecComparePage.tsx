import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GitCompare } from 'lucide-react';
import { SpecVersionCompare } from '../components/autosar/SpecVersionCompare';

export function SpecComparePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16">
      <Helmet>
        <title>版本对比 - AutoSAR 规范引擎 - YuleTech</title>
      </Helmet>

      {/* Header */}
      <div className="border-b border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/autosar/spec')}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <GitCompare className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm">版本对比</span>
          <span className="text-xs text-muted-foreground">比较不同 AUTOSAR 规范版本的 API 差异</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SpecVersionCompare />
      </div>
    </div>
  );
}
