/**
 * seed-specs.ts — 将 AutoSAR 规范数据导入 PostgreSQL
 *
 * 先尝试 seed-data/specs.json（生产预构建），
 * 失败则从前端 TS 源文件解析（开发环境）。
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool, { runMigrations } from './services/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const moduleFilter = args.includes('--module') ? args[args.indexOf('--module') + 1] : null;
const dryRun = args.includes('--dry-run');

interface SpecApi {
  id: string; name: string; signature: string; brief: string; description: string;
  params: Array<Record<string, unknown>>;
  returnType: string; returnDescription: string;
  moduleId: string; layerId: string; version: string;
  example: string; exampleDescription?: string;
  seeAlso: string[]; configParams?: Array<Record<string, unknown>>;
  timing?: string; status: string;
}

function loadSpecs(): SpecApi[] {
  const jsonPath = resolve(__dirname, '../seed-data/specs.json');
  if (existsSync(jsonPath)) {
    return JSON.parse(readFileSync(jsonPath, 'utf-8'));
  }

  console.log('  (No specs.json, parsing TS sources...)');
  const specDir = resolve(__dirname, '../../src/data/autosar');
  if (!existsSync(specDir)) { console.error('  No spec sources'); process.exit(1); }

  const files = readdirSync(specDir).filter(f => f.endsWith('-spec.ts') && !f.startsWith('_')).sort();
  const all: SpecApi[] = [];

  for (const file of files) {
    const content = readFileSync(resolve(specDir, file), 'utf-8');
    const cleaned = content
      .split('\n').filter(l => !l.trimStart().startsWith('import ')).join('\n')
      .replace(/: AutosarApi\[\]/g, '').replace(/: AutosarApi/g, '')
      .replace(/: string\[\]/g, '').replace(/: string/g, '').replace(/: number/g, '')
      .replace(/: boolean/g, '').replace(/: AutosarParam/g, '')
      .replace(/: ConfigParamRef/g, '').replace(/: Record/g, '').replace(/as\s+const/g, '');
    const m = cleaned.match(/\w+\s*=\s*(\[[\s\S]*\])\s*;/);
    if (m) try { const r = new Function(`return ${m[1]};`)(); if (Array.isArray(r)) all.push(...r); } catch {}
  }
  return all;
}

async function seedSpecs() {
  console.log('  Seeding API specs...');
  if (!dryRun) await runMigrations();

  const apis = loadSpecs();
  if (!Array.isArray(apis) || apis.length === 0) { console.error('  No specs loaded'); process.exit(1); }
  console.log(`  Loaded ${apis.length} APIs`);

  let count = 0;
  for (const api of apis) {
    if (!api.id) continue;
    if (moduleFilter && api.moduleId?.toLowerCase() !== moduleFilter.toLowerCase()) continue;

    if (dryRun) { console.log(`    ${api.id}: ${api.brief}`); count++; continue; }

    const result = await pool.query(
      `INSERT INTO api_specs (id, module_id, layer_id, name, signature, brief, description,
        params, return_type, return_description, version, example, example_description,
        see_also, config_params, timing, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       ON CONFLICT (id) DO UPDATE SET signature=EXCLUDED.signature, brief=EXCLUDED.brief,
        params=EXCLUDED.params, status=EXCLUDED.status`,
      [api.id, api.moduleId, api.layerId, api.name, api.signature, api.brief, api.description,
       JSON.stringify(api.params), api.returnType, api.returnDescription, api.version,
       api.example, api.exampleDescription || '', JSON.stringify(api.seeAlso),
       JSON.stringify(api.configParams || []), api.timing || '', api.status]
    );
    if ((result.rowCount ?? 0) > 0) count++;
  }

  console.log(`\n  Done: ${count} APIs seeded`);
  await pool.end();
}

seedSpecs().catch(err => { console.error('Spec seed failed:', err); process.exit(1); });
