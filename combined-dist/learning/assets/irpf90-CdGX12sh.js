import { g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';
import { as as requireIrpf90 } from './index-DfgHt5Bw.js';

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

var irpf90Exports = requireIrpf90();
const irpf90 = /*@__PURE__*/getDefaultExportFromCjs(irpf90Exports);

const irpf90$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: irpf90
}, [irpf90Exports]);

export { irpf90$1 as i };
