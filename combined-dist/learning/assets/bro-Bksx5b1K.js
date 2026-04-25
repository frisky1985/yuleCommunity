import { g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';
import { cF as requireBro } from './index-DfgHt5Bw.js';

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

var broExports = requireBro();
const bro = /*@__PURE__*/getDefaultExportFromCjs(broExports);

const bro$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: bro
}, [broExports]);

export { bro$1 as b };
