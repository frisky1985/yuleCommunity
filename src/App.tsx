import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OpenSourcePage } from './pages/OpenSourcePage';
import { ToolchainPage } from './pages/ToolchainPage';
import { LearningPage } from './pages/LearningPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';
import { BlogPage } from './pages/BlogPage';
import { DocsPage } from './pages/DocsPage';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opensource" element={<OpenSourcePage />} />
          <Route path="/toolchain" element={<ToolchainPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
