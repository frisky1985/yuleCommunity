import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PageLoader } from './components/PageLoader';
import { AdminLayout } from './components/AdminLayout';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const OpenSourcePage = lazy(() => import('./pages/OpenSourcePage').then(m => ({ default: m.OpenSourcePage })));
const ToolchainPage = lazy(() => import('./pages/ToolchainPage').then(m => ({ default: m.ToolchainPage })));
const LearningPage = lazy(() => import('./pages/LearningPage').then(m => ({ default: m.LearningPage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(m => ({ default: m.CommunityPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const DocsPage = lazy(() => import('./pages/DocsPage').then(m => ({ default: m.DocsPage })));
const ForumPage = lazy(() => import('./pages/ForumPage').then(m => ({ default: m.ForumPage })));
const QAPage = lazy(() => import('./pages/QAPage').then(m => ({ default: m.QAPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const HardwarePage = lazy(() => import('./pages/HardwarePage').then(m => ({ default: m.HardwarePage })));
const DownloadPage = lazy(() => import('./pages/DownloadPage').then(m => ({ default: m.DownloadPage })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminUsers = lazy(() => import('./pages/AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminContent = lazy(() => import('./pages/AdminContent').then(m => ({ default: m.AdminContent })));
const AdminSettings = lazy(() => import('./pages/AdminSettings').then(m => ({ default: m.AdminSettings })));
const ModuleDetailPage = lazy(() => import('./pages/ModuleDetailPage').then(m => ({ default: m.ModuleDetailPage })));

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={
          <Suspense fallback={<PageLoader />}>
            <AdminLoginPage />
          </Suspense>
        } />
        <Route path="/admin" element={
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="users" element={
            <Suspense fallback={<PageLoader />}>
              <AdminUsers />
            </Suspense>
          } />
          <Route path="content" element={
            <Suspense fallback={<PageLoader />}>
              <AdminContent />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<PageLoader />}>
              <AdminSettings />
            </Suspense>
          } />
        </Route>

        {/* Public routes */}
        <Route path="*" element={
          <>
            <OfflineIndicator />
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/opensource" element={<OpenSourcePage />} />
                  <Route path="/opensource/:moduleId" element={<ModuleDetailPage />} />
                  <Route path="/toolchain" element={<ToolchainPage />} />
                  <Route path="/learning" element={<LearningPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="/qa" element={<QAPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/hardware" element={<HardwarePage />} />
                  <Route path="/downloads" element={<DownloadPage />} />
                  <Route path="*" element={
                    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                      <h1 className="text-6xl font-bold text-gradient-accent mb-4">404</h1>
                      <h2 className="text-2xl font-semibold mb-2">页面未找到</h2>
                      <p className="text-muted-foreground mb-6">抱歉，您访问的页面不存在。</p>
                      <a href="#/" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        返回首页
                      </a>
                    </div>
                  } />
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

export default App;
