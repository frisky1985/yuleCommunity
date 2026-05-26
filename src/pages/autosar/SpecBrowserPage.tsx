import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, ArrowLeft, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SpecTreeNav } from '../../components/autosar/SpecTreeNav';
import { ApiCard } from '../../components/autosar/ApiCard';
import { EmptyApiCard } from '../../components/autosar/EmptyApiCard';
import { findApiById, findModuleById, SPEC_VERSIONS } from '../../data/autosar/spec-index';

export function SpecBrowserPage() {
  const { module: moduleParam, api: apiParam } = useParams();
  const navigate = useNavigate();

  const selectedApi = useMemo(() => {
    if (apiParam) return findApiById(apiParam);
    if (moduleParam) {
      const mod = findModuleById(moduleParam);
      if (mod && mod.apis.length > 0) return mod.apis[0];
    }
    return null;
  }, [moduleParam, apiParam]);

  const selectedModule = useMemo(() => {
    if (!selectedApi) return null;
    return findModuleById(selectedApi.moduleId);
  }, [selectedApi]);

  const handleSelectApi = (apiId: string) => {
    const api = findApiById(apiId);
    if (api) {
      navigate(`/autosar/spec/${api.moduleId}/${api.id}`);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Helmet>
        <title>{selectedApi ? `${selectedApi.name} - AutoSAR 规范` : 'AutoSAR 规范引擎'} - YuleTech</title>
      </Helmet>

      {/* Header */}
      <div className="border-b border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/autosar')}
              className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">规范引擎</span>
            </div>
            {selectedModule && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm">{selectedModule.name}</span>
              </>
            )}
            {selectedApi && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm font-mono text-primary">{selectedApi.name}</span>
              </>
            )}
          </div>

          {/* Version selector */}
          <div className="flex items-center gap-3">
            <Link
              to="/autosar/spec/compare"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/30"
            >
              <GitCompare className="w-3.5 h-3.5" />
              版本对比
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">版本:</span>
              <select className="text-xs px-2 py-1 rounded-md bg-background border border-border">
                {SPEC_VERSIONS.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main content: sidebar + detail */}
      <div className="flex h-[calc(100vh-8.5rem)]">
        {/* Left sidebar - Tree */}
        <div className="w-[240px] shrink-0 border-r border-border bg-muted/5 overflow-hidden hidden md:block">
          <SpecTreeNav
            selectedApi={selectedApi?.id || null}
            onSelectApi={handleSelectApi}
          />
        </div>

        {/* Right - Detail */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-6">
            {selectedApi ? (
              <ApiCard api={selectedApi} />
            ) : (
              <EmptyApiCard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
