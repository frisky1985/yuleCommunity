import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PageLoader } from './components/PageLoader';

// 首页
import { HomePage } from './pages/HomePage';

// 开源页面
import { OpenSourcePage } from './pages/opensource/OpenSourcePage';
import { ToolchainPage } from './pages/opensource/ToolchainPage';

// 学习页面
import { LearningPage } from './pages/learning/LearningPage';
import { DocsPage } from './pages/learning/DocsPage';
import { BlogPage } from './pages/learning/BlogPage';

// 社区页面
import { CommunityPage } from './pages/community/CommunityPage';
import { ForumPage } from './pages/community/ForumPage';
import { QAPage } from './pages/community/QAPage';
import { EventsPage } from './pages/community/EventsPage';

// 管理后台
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OfflineIndicator />
      <Navbar />
      <main className="pt-16">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* 首页 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 开源代码 */}
            <Route path="/opensource" element={<OpenSourcePage />} />
            <Route path="/toolchain" element={<ToolchainPage />} />
            
            {/* 学习成长 */}
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            
            {/* 社区 */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/events" element={<EventsPage />} />
            
            {/* 管理后台 */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* 404 */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground">页面不存在</p>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App
