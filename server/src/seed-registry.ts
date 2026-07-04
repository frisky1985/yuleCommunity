/**
 * seed-registry.ts — 将模块仓库数据从前端 TS 源文件导入 PostgreSQL
 *
 * 用法:
 *   npx tsx server/src/seed-registry.ts                   # 导入全部
 *   npx tsx server/src/seed-registry.ts --module can-stack # 只导入指定模块
 *   npx tsx server/src/seed-registry.ts --dry-run          # 只打印
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool, { runMigrations } from './services/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const moduleFilter = args.includes('--module') ? args[args.indexOf('--module') + 1] : null;

interface SeedMod {
  id: string;
  name: string;
  version: string;
  layer: string;
  description: string;
  tags: string[];
  author: string;
  configData: string;
  compatibility: { mcu: string[]; os: string[]; compiler: string[] };
  dependencies: Array<{ name: string; version: string; optional: boolean }>;
  stats: { downloads: number; rating: number; reviewCount: number };
  status: string;
  timestamps: { created: string; updated: string; published?: string };
}

async function seedRegistry() {
  console.log('  Seeding registry modules...');

  const srcPath = resolve(__dirname, '../../src/data/autosar/registry-samples.ts');
  const content = readFileSync(srcPath, 'utf-8');

  // 尝试用 Function 解析全部 JavaScript
  const cleaned = content
    .split('\n')
    .filter(l => !l.trimStart().startsWith('import '))
    .join('\n')
    // 去掉所有类型标注
    .replace(/:\s*RegistryModule\[\]/g, '')
    .replace(/:\s*RegistryModule/g, '')
    .replace(/:\s*RegistryCompatibility/g, '')
    .replace(/:\s*RegistryStats/g, '')
    .replace(/:\s*RegistryModuleDependency\[\]/g, '')
    .replace(/:\s*any\b/g, '')
    .replace(/:\s*string\[\]/g, '')
    .replace(/:\s*string\b/g, '')
    .replace(/:\s*number\b/g, '')
    .replace(/:\s*boolean\b/g, '')
    .replace(/:\s*Record\s*<[^>]+>/g, '')
    .replace(/as\s+const/g, '');

  // 定位 export const REGISTRY_MODULES = [...];
  const arrStart = cleaned.search(/REGISTRY_MODULES\s*=\s*\[/);
  if (arrStart < 0) throw new Error('Cannot find REGISTRY_MODULES');

  // 从 '=' 后的 '[' 开始，用括号匹配找到对应的 '];'
  const eqPos = cleaned.indexOf('[', arrStart);
  const closing = findMatching(cleaned, eqPos, '[', ']');
  if (closing < 0) throw new Error('Cannot match array brackets');

  const fnBody = `return ${cleaned.substring(eqPos, closing + 1)};`;

  let modules: SeedMod[] = [];
  try {
    modules = new Function(fnBody)() as SeedMod[];
  } catch (e: any) {
    console.error('  Function constructor failed:', e.message);
    process.exit(1);
  }

  if (!Array.isArray(modules) || modules.length === 0) {
    console.error('  Parsed result is not a non-empty array');
    process.exit(1);
  }

  // configData 可能还是 JS 对象 —— 将其序列化为字符串
  for (const m of modules) {
    if (typeof m.configData === 'object') {
      m.configData = JSON.stringify(m.configData, null, 2);
    }
  }

  console.log(`  Parsed ${modules.length} modules`);

  if (!dryRun) {
    await runMigrations();
  }

  let count = 0;
  for (const m of modules) {
    if (!m.id) continue;
    if (moduleFilter && m.id !== moduleFilter) continue;

    if (dryRun) {
      console.log(`    ${m.id}: ${m.name} v${m.version} [${m.layer}] (${m.status})`);
      count++;
      continue;
    }

    // UPSERT
    await pool.query(
      `INSERT INTO registry_modules
        (id, name, version, layer, description, tags, author,
         config_data, compatibility, dependencies, stats, status,
         created_at, updated_at, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         version = EXCLUDED.version,
         tags = EXCLUDED.tags,
         stats = EXCLUDED.stats,
         status = EXCLUDED.status,
         updated_at = EXCLUDED.updated_at`,
      [
        m.id, m.name, m.version, m.layer, m.description,
        JSON.stringify(m.tags), m.author, m.configData,
        JSON.stringify(m.compatibility), JSON.stringify(m.dependencies),
        JSON.stringify(m.stats), m.status,
        m.timestamps.created, m.timestamps.updated,
        m.timestamps.published || null,
      ]
    );

    // 插入版本记录（如果不存在）
    const has = await pool.query(
      `SELECT 1 FROM registry_versions WHERE module_id = $1 AND version = $2`,
      [m.id, m.version]
    );
    if (has.rows.length === 0) {
      await pool.query(
        `INSERT INTO registry_versions (id, module_id, version, release_notes)
         VALUES ($1, $2, $3, $4)`,
        [`${m.id}-v${m.version.replace(/\./g, '-')}`, m.id, m.version,
         `种子数据: ${m.version}`]
      );
    }

    count++;
  }

  if (dryRun) {
    console.log(`\n  Dry run: ${count} modules displayed`);
  } else {
    console.log(`\n  Done: ${count} modules seeded`);
  }

  await pool.end();
}

function findMatching(str: string, start: number, open: string, close: string): number {
  let depth = 0;
  let inStr = '';
  for (let i = start; i < str.length; i++) {
    const ch = str[i];
    if (ch === '\\' && inStr) { i++; continue; }
    if ((ch === '"' || ch === "'") && !inStr) { inStr = ch; continue; }
    if (ch === '`' && !inStr) { inStr = '`'; continue; }
    if (ch === inStr) { inStr = ''; continue; }
    if (inStr) continue;
    if (ch === open) depth++;
    else if (ch === close) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

seedRegistry().catch(err => {
  console.error('Registry seed failed:', err);
  process.exit(1);
});
