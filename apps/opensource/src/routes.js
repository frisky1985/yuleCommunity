import { jsx as _jsx } from "react/jsx-runtime";
import { OpenSourcePage } from './pages/OpenSourcePage';
import { ToolchainPage } from './pages/ToolchainPage';
export const routes = [
    {
        path: '/opensource',
        element: _jsx(OpenSourcePage, {}),
    },
    {
        path: '/opensource/*',
        element: _jsx(OpenSourcePage, {}),
    },
    {
        path: '/toolchain',
        element: _jsx(ToolchainPage, {}),
    },
    {
        path: '/toolchain/*',
        element: _jsx(ToolchainPage, {}),
    },
];
export default routes;
