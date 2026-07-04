/**
 * seed-registry.ts — 将模块仓库数据导入 PostgreSQL
 *
 * 先尝试 seed-data/registry.json（生产预构建），
 * 失败则从前端 TS 源文件解析（开发环境）。
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool, { runMigrations } from './services/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const moduleFilter = args.includes('--module') ? args[args.indexOf('--module') + 1] : null;

interface SeedMod {
  id: string; name: string; version: string; layer: string;
  description: string; tags: string[]; author: string;
  configData: string;
  compatibility: { mcu: string[]; os: string[]; compiler: string[] };
  dependencies: Array<{ name: string; version: string; optional: boolean }>;
  stats: { downloads: number; rating: number; reviewCount: number };
  status: string;
  timestamps: { created: string; updated: string; published?: string };
}

function loadRegistry(): SeedMod[] {
  const jsonPath = resolve(__dirname, '../seed-data/registry.json');
  if (existsSync(jsonPath)) {
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    // 确保 configData 是字符串
    for (const m of data) {
      if (typeof m.configData === 'object') m.configData = JSON.stringify(m.configData, null, 2);
    }
    return data;
  }

  console.log('  (No registry.json, parsing TS sources...)');
  const srcPath = resolve(__dirname, '../../src/data/autosar/registry-samples.ts');
  if (!existsSync(srcPath)) { console.error('  No registry-samples.ts'); process.exit(1); }

  const content = readFileSync(srcPath, 'utf-8');
  const cleaned = content
    .split('\n').filter(l => !l.trimStart().startsWith('import ')).join('\n')
    .replace(/export\s+const\s+REGISTRY_MODULES\s*:\s*RegistryModule\[\]\s*=\s*/, 'const __REG = ')
    .replace(/: RegistryModule\[\]/g, '').replace(/: RegistryModule/g, '')
    .replace(/: RegistryCompatibility/g, '').replace(/: RegistryStats/g, '')
    .replace(/: RegistryModuleDependency\[\]/g, '').replace(/: any/g, '')
    .replace(/: string\[\]/g, '').replace(/: string/g, '').replace(/: number/g, '')
    .replace(/: boolean/g, '').replace(/: Record/g, '').replace(/as\s+const/g, '');

  const start = cleaned.indexOf('[');
  let depth = 0, close = -1;
  for (let i = start; i < cleaned.length; i++) {
    if (cleaned[i] === '[') depth++;
    else if (cleaned[i] === ']') { depth--; if (depth === 0) { close = i; break; } }
  }
  if (close < 0) { console.error('  Cannot locate array'); process.exit(1); }

  try {
    const fn = new Function('return ' + cleaned.substring(start, close + 1) + ';');
    const mods = fn();
    if (!Array.isArray(mods)) { console.error('  Not an array'); process.exit(1); }
    for (const m of mods) {
      if (typeof m.configData === 'object') m.configData = JSON.stringify(m.configData, null, 2);
    }
    return mods;
  } catch (e: any) {
    console.error('  Parse failed:', e.message);
    process.exit(1);
  }
}

async function seedRegistry() {
  console.log('  Seeding registry modules...');
  if (!dryRun) await runMigrations();

  const modules = loadRegistry();
  console.log(`  Loaded ${modules.length} modules`);

  let count = 0;
  for (const m of modules) {
    if (!m.id) continue;
    if (moduleFilter && m.id !== moduleFilter) continue;

    if (dryRun) { console.log(`    ${m.id}: ${m.name} v${m.version}`); count++; continue; }

    await pool.query(
      `INSERT INTO registry_modules (id, name, version, layer, description, tags, author,
        config_data, compatibility, dependencies, stats, status, created_at, updated_at, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, version=EXCLUDED.version,
        tags=EXCLUDED.tags, stats=EXCLUDED.stats, status=EXCLUDED.status, updated_at=EXCLUDED.updated_at`,
      [m.id, m.name, m.version, m.layer, m.description, JSON.stringify(m.tags), m.author,
       m.configData, JSON.stringify(m.compatibility), JSON.stringify(m.dependencies),
       JSON.stringify(m.stats), m.status, m.timestamps.created, m.timestamps.updated,
       m.timestamps.published || null]
    );

    const has = await pool.query('SELECT 1 FROM registry_versions WHERE module_id=$1 AND version=$2', [m.id, m.version]);
    if (has.rows.length === 0) {
      await pool.query('INSERT INTO registry_versions (id, module_id, version) VALUES ($1,$2,$3)',
        [`${m.id}-v${m.version.replace(/\./g, '-')}`, m.id, m.version]);
    }
    count++;
  }

  console.log(`\n  Done: ${count} modules seeded`);
  await pool.end();
}

seedRegistry().catch(err => { console.error('Registry seed failed:', err); process.exit(1); });
