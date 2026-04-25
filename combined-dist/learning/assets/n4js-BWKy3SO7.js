import { g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';
import { eH as requireN4js } from './index-DfgHt5Bw.js';

function _mergeNamespaces(n, m) {
	for (var i = 0; i < m.length; i++) {
		const e = m[i];
		if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
			if (k !== 'default' && !(k in n)) {
				const d = Object.getOwnPropertyDescriptor(e, k);
				if (d) {
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: () => e[k]
					});
				}
			}
		} }
	}
	return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

var n4jsExports = requireN4js();
const n4js = /*@__PURE__*/getDefaultExportFromCjs(n4jsExports);

const n4js$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: n4js
}, [n4jsExports]);

export { n4js$1 as n };
