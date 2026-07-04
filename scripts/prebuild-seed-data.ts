/**
 * prebuild-seed-data.ts — 构建前预解析前端 spec/registry 数据为 JSON
 *
 * 用法: node scripts/prebuild-seed-data.ts
 *
 * 输出: server/seed-data/specs.json, server/seed-data/registry.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../server/seed-data');
const AUTOSAR_DIR = resolve(__dirname, '../src/data/autosar');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ── 1. Spec 文件 ──
const specFiles = [
  'can-spec.ts', 'canif-spec.ts', 'com-spec.ts', 'dio-spec.ts',
  'ecum-spec.ts', 'mcu-spec.ts', 'nvm-spec.ts', 'pdur-spec.ts',
  'port-spec.ts', 'rte-spec.ts', 'spi-spec.ts',
];

const allSpecs: any[] = [];
for (const file of specFiles) {
  const content = readFileSync(resolve(AUTOSAR_DIR, file), 'utf-8');
  const cleaned = content
    .split('\n').filter(l => !l.trimStart().startsWith('import ')).join('\n')
    .replace(/: AutosarApi\[\]/g, '').replace(/: AutosarApi/g, '').replace(/: string\[\]/g, '')
    .replace(/: string/g, '').replace(/: number/g, '').replace(/: boolean/g, '')
    .replace(/: AutosarParam/g, '').replace(/: ConfigParamRef/g, '').replace(/: Record/g, '')
    .replace(/as\s+const/g, '');

  const arrMatch = cleaned.match(/\w+\s*=\s*(\[[\s\S]*\])\s*;/);
  if (!arrMatch) { console.warn(`  Skip ${file}`); continue; }

  try {
    const fn = new Function(`return ${arrMatch[1]};`);
    const apis = fn();
    if (Array.isArray(apis)) { allSpecs.push(...apis); console.log(`  ${file}: ${apis.length} APIs`); }
  } catch { console.warn(`  Skip ${file}: parse error`); }
}

writeFileSync(resolve(OUT_DIR, 'specs.json'), JSON.stringify(allSpecs, null, 2));
console.log(`\nWrote ${allSpecs.length} APIs to seed-data/specs.json`);

// ── 2. Registry ──
const regContent = readFileSync(resolve(AUTOSAR_DIR, 'registry-samples.ts'), 'utf-8');
const regCleaned = regContent
  .split('\n').filter(l => !l.trimStart().startsWith('import ')).join('\n')
  // Remove all export/type annotations
  .replace(/export\s+const\s+REGISTRY_MODULES\s*:\s*RegistryModule\[\]\s*=\s*/, 'const __REG = ')
  .replace(/:\s*RegistryModule\[\]/g, '')
  .replace(/:\s*RegistryModule/g, '').replace(/:\s*RegistryCompatibility/g, '')
  .replace(/:\s*RegistryStats/g, '').replace(/:\s*RegistryModuleDependency\[\]/g, '')
  .replace(/:\s*any/g, '').replace(/:\s*string\[\]/g, '').replace(/:\s*string/g, '')
  .replace(/:\s*number/g, '').replace(/:\s*boolean/g, '').replace(/:\s*Record/g, '')
  .replace(/as\s+const/g, '');

// Extract array content using brace matching
const startIdx = regCleaned.indexOf('[');
let depth = 0, closeIdx = -1;
for (let i = startIdx; i < regCleaned.length; i++) {
  if (regCleaned[i] === '[') depth++;
  else if (regCleaned[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
}

if (closeIdx > 0) {
  try {
    const fn = new Function('return ' + regCleaned.substring(startIdx, closeIdx + 1) + ';');
    const modules = fn();
    if (Array.isArray(modules)) {
      for (const m of modules) {
        if (typeof m.configData === 'object') m.configData = JSON.stringify(m.configData, null, 2);
        if (typeof m.stats === 'object') m.stats = { downloads: m.stats.downloads || 0, rating: m.stats.rating || 0, reviewCount: m.stats.reviewCount || 0 };
      }
      writeFileSync(resolve(OUT_DIR, 'registry.json'), JSON.stringify(modules, null, 2));
      console.log(`Wrote ${modules.length} modules to seed-data/registry.json`);
    }
  } catch (e: any) {
    console.error('Registry parse failed:', e.message);
  }
} else {
  console.error('Could not find array in registry-samples.ts');
}

console.log('\nDone.');
