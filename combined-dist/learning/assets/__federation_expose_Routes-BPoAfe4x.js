import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';
import { L as LearningPage, D as DocsPage, B as BlogPage } from './BlogPage-9ekSxJJR.js';

const routes = [
  {
    path: "/learning",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(LearningPage, {})
  },
  {
    path: "/learning/*",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(LearningPage, {})
  },
  {
    path: "/docs",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(DocsPage, {})
  },
  {
    path: "/docs/*",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(DocsPage, {})
  },
  {
    path: "/blog",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPage, {})
  },
  {
    path: "/blog/*",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPage, {})
  }
];

export { routes as default, routes };
