var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

function AdminDashboard() {
    return (jsxRuntimeExports.jsxs("div", { className: "p-8", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u7BA1\u7406\u4EEA\u8868\u76D8" }), jsxRuntimeExports.jsx("p", { children: "\u6B22\u8FCE\u4F7F\u7528\u7BA1\u7406\u540E\u53F0" })] }));
}

function AdminUsers() {
    return (jsxRuntimeExports.jsxs("div", { className: "p-8", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u7528\u6237\u7BA1\u7406" }), jsxRuntimeExports.jsx("p", { children: "\u7528\u6237\u7BA1\u7406\u9875\u9762" })] }));
}

function AdminContent() {
    return (jsxRuntimeExports.jsxs("div", { className: "p-8", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u5185\u5BB9\u7BA1\u7406" }), jsxRuntimeExports.jsx("p", { children: "\u5185\u5BB9\u7BA1\u7406\u9875\u9762" })] }));
}

function AdminSettings() {
    return (jsxRuntimeExports.jsxs("div", { className: "p-8", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u7CFB\u7EDF\u8BBE\u7F6E" }), jsxRuntimeExports.jsx("p", { children: "\u7CFB\u7EDF\u8BBE\u7F6E\u9875\u9762" })] }));
}

function AdminLoginPage() {
    return (jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: jsxRuntimeExports.jsxs("div", { className: "p-8 bg-card rounded-lg border", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u7BA1\u7406\u5458\u767B\u5F55" }), jsxRuntimeExports.jsx("p", { children: "\u767B\u5F55\u9875\u9762" })] }) }));
}

const routes = [
    { path: '/admin/login', element: jsxRuntimeExports.jsx(AdminLoginPage, {}) },
    { path: '/admin/dashboard', element: jsxRuntimeExports.jsx(AdminDashboard, {}) },
    { path: '/admin/users', element: jsxRuntimeExports.jsx(AdminUsers, {}) },
    { path: '/admin/content', element: jsxRuntimeExports.jsx(AdminContent, {}) },
    { path: '/admin/settings', element: jsxRuntimeExports.jsx(AdminSettings, {}) },
];

export { routes as default, jsxRuntimeExports as j, routes };
