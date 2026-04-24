import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PageLoader } from './components/PageLoader';

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

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OfflineIndicator />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/opensource" element={<OpenSourcePage />} />
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
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
