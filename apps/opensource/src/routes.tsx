import { Routes, Route } from 'react-router-dom';
import { OpenSourcePage } from './pages/OpenSourcePage';
import { ToolchainPage } from './pages/ToolchainPage';

// Export as default for Module Federation compatibility
function AppRoutes() {
  return (
    <Routes>
      <Route path="/opensource" element={<OpenSourcePage />} />
      <Route path="/opensource/*" element={<OpenSourcePage />} />
      <Route path="/toolchain" element={<ToolchainPage />} />
      <Route path="/toolchain/*" element={<ToolchainPage />} />
    </Routes>
  );
}

export default AppRoutes;
