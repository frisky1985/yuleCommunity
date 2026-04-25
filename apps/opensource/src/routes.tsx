import { RouteObject } from 'react-router-dom';
import { OpenSourcePage } from './pages/OpenSourcePage';
import { ToolchainPage } from './pages/ToolchainPage';

export const routes: RouteObject[] = [
  {
    path: '/opensource',
    element: <OpenSourcePage />,
  },
  {
    path: '/opensource/*',
    element: <OpenSourcePage />,
  },
  {
    path: '/toolchain',
    element: <ToolchainPage />,
  },
  {
    path: '/toolchain/*',
    element: <ToolchainPage />,
  },
];

export default routes;
