import { jsx as _jsx } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
function App() {
    return (_jsx(Routes, { children: routes.map((route) => (_jsx(Route, { path: route.path, element: route.element }, route.path))) }));
}
export default App;
