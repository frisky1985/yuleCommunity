import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PageLoader } from './components/PageLoader';
import { AdminLayout } from './components/AdminLayout';

// 动态加载远程模块
const OpenSourceRoutes = lazy(() => import('opensource/routes').catch(() => ({ default: () => <div>Loading OpenSource...</div> })));
const CommunityRoutes = lazy(() => import('community/routes').catch(() => ({ default: () => <div>Loading Community...</div> })));
const LearningRoutes = lazy(() => import('learning/routes').catch(() => ({ default: () => <div>Loading Learning...</div> })));
const AdminRoutes = lazy(() => import('admin/routes').catch(() => ({ default: () => <div>Loading Admin...</div> })));

// Shell 内部页面
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        {/* Admin routes - 独立布局 */}
        <Route path="/admin/*" element={
          <Suspense fallback={<PageLoader />}>
            <AdminRoutes />
          </Suspense>
        } />

        {/* Public routes */}
        <Route path="*" element={
          <>
            <OfflineIndicator />
            <Navbar />
            <main className="pt-16">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  
                  {/* 远程模块路由 */}
                  <Route path="/opensource/*" element={<OpenSourceRoutes />} />
                  <Route path="/toolchain/*" element={<OpenSourceRoutes />} />
                  <Route path="/community/*" element={<CommunityRoutes />} />
                  <Route path="/forum/*" element={<CommunityRoutes />} />
                  <Route path="/qa/*" element={<CommunityRoutes />} />
                  <Route path="/events/*" element={<CommunityRoutes />} />
                  <Route path="/learning/*" element={<LearningRoutes />} />
                  <Route path="/docs/*" element={<LearningRoutes />} />
                  <Route path="/blog/*" element={<LearningRoutes />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App
