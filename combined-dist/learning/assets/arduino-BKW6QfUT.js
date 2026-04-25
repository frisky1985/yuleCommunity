import { g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';
import { cl as requireArduino } from './index-DfgHt5Bw.js';

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

var arduinoExports = requireArduino();
const arduino = /*@__PURE__*/getDefaultExportFromCjs(arduinoExports);

const arduino$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: arduino
}, [arduinoExports]);

export { arduino$1 as a };
