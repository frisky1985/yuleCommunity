/**
 * seed-specs.ts — 将 AutoSAR 规范数据从前端 TS 源文件导入 PostgreSQL
 *
 * 用法:
 *   npx tsx server/src/seed-specs.ts                   # 导入所有模块
 *   npx tsx server/src/seed-specs.ts --module Can      # 只导入指定模块
 *   npx tsx server/src/seed-specs.ts --dry-run         # 只打印不执行
 *
 * 逻辑: 读取前端 src/data/autosar/*-spec.ts 中的 API 数据,
 *       转换为扁平列插入 api_specs 表 (UPSERT 基于 id)
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool, { runMigrations } from './services/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 解析命令行参数
const args = process.argv.slice(2);
const moduleFilter = args.includes('--module') ? args[args.indexOf('--module') + 1] : null;
const dryRun = args.includes('--dry-run');

/** 从文件名取模块名 (e.g. "can-spec" -> "Can") */
function moduleNameFromFile(filename: string): string {
  return filename.replace('-spec.ts', '').toUpperCase();
}

interface SpecApi {
  id: string;
  name: string;
  signature: string;
  brief: string;
  description: string;
  params: Array<Record<string, unknown>>;
  returnType: string;
  returnDescription: string;
  moduleId: string;
  layerId: string;
  version: string;
  example: string;
  exampleDescription?: string;
  seeAlso: string[];
  configParams?: Array<Record<string, unknown>>;
  timing?: string;
  status: string;
}

/**
 * 使用 Function 构造器来安全解析 TS 源文件中的对象数组
 * 原理: 去掉类型标注后就是合法的 JS 对象字面量
 */
function parseApisFromFile(filePath: string, moduleName: string): SpecApi[] {
  const content = readFileSync(filePath, 'utf-8');

  // 去掉 import 行和类型相关的声明
  const cleanLines = content
    .split('\n')
    .filter(line => !line.trimStart().startsWith('import '))
    .join('\n');

  // 去掉类型标注
  const noTypes = cleanLines
    .replace(/: AutosarApi\[\]/g, '')
    .replace(/as\s+const/g, '')
    .replace(/:\s*string\b/g, ': ""')
    .replace(/:\s*number\b/g, ': 0')
    .replace(/:\s*boolean\b/g, ': false')
    .replace(/:\s*string\[\]\s*=>/g, '=>');

  // 提取 export const XXX = [...] 中的数组
  // 使用括号匹配来找到正确的闭合位置，避免被模板字符串内部的大括号干扰
  const arrStartMatch = noTypes.match(/(?:export\s+)?const\s+\w+\s*=\s*\[/);
  if (!arrStartMatch) return [];
  const startIdx = arrStartMatch.index!;
  const startOfArray = startIdx + arrStartMatch[0].length - 1; // 指向 '['
  const closingBracket = findMatchingBracket(noTypes, startOfArray, '[', ']');
  if (closingBracket < 0) return [];
  const arrayStr = noTypes.substring(startOfArray, closingBracket + 1);

  try {
    const fn = new Function(`return ${arrayStr};`);
    const result = fn();
    if (Array.isArray(result)) {
      return result as SpecApi[];
    }
  } catch (e) {
    // Function constructor failed, try split-based fallback
    const arrStr = arrayStr;
    const rawObjects = splitTopLevelObjects(arrStr);
    const apis: SpecApi[] = [];
    for (const raw of rawObjects) {
      try {
        const cleaned = raw
          .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
          .replace(/`([\s\S]*?)`/g, (_, inner: string) =>
            JSON.stringify(inner.replace(/\n\s*/g, '\\n').replace(/\t/g, '\\t'))
          )
          .replace(/,\s*}/g, '}')
          .replace(/,\s*\]/g, ']');
        const obj = JSON.parse('{' + cleaned + '}');
        apis.push({
          id: obj.id || '',
          name: obj.name || obj.id || '',
          signature: obj.signature || '',
          brief: obj.brief || '',
          description: obj.description || '',
          params: obj.params || [],
          returnType: obj.returnType || '',
          returnDescription: obj.returnDescription || '',
          moduleId: obj.moduleId || moduleName,
          layerId: obj.layerId || 'MCAL',
          version: obj.version || '4.4',
          example: obj.example || '',
          exampleDescription: obj.exampleDescription || '',
          seeAlso: obj.seeAlso || [],
          configParams: obj.configParams || [],
          timing: obj.timing || '',
          status: obj.status || 'standard',
        });
      } catch { /* skip */ }
    }
    return apis;
  }

  return [];
}

/** 找到匹配的括号/方括号，正确处理字符串和模板字面量 */
function findMatchingBracket(str: string, startIdx: number, open: string, close: string): number {
  if (str[startIdx] !== open) return -1;
  let depth = 1;
  let inStr = '';
  let escape = false;

  for (let i = startIdx + 1; i < str.length; i++) {
    const ch = str[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inStr) { escape = true; continue; }
    if ((ch === '"' || ch === "'") && !inStr) { inStr = ch; continue; }
    if (ch === '`' && !inStr) { inStr = '`'; continue; }
    if (ch === inStr) { inStr = ''; continue; }
    if (inStr) continue;

    if (ch === open) depth++;
    else if (ch === close) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/** 在数组字符串中分割顶层对象 `{...}, {...}` */
function splitTopLevelObjects(arrStr: string): string[] {
  const results: string[] = [];
  let depth = 0;
  let start = -1;
  let inStr = '';
  let escape = false;

  for (let i = 0; i < arrStr.length; i++) {
    const ch = arrStr[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inStr) { escape = true; continue; }
    if ((ch === '"' || ch === "'") && !inStr) { inStr = ch; continue; }
    if (ch === '`' && !inStr) { inStr = '`'; continue; }
    if (ch === inStr) { inStr = ''; continue; }
    if (inStr) continue;

    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        results.push(arrStr.substring(start + 1, i));
        start = -1;
      }
    }
  }
  return results;
}

async function seedSpecs() {
  console.log('  Seeding API specs...');

  // 确定前端 spec 目录
  const specDir = resolve(__dirname, '../../src/data/autosar');
  if (!existsSync(specDir)) {
    console.error('  Spec directory not found:', specDir);
    process.exit(1);
  }

  const files = readdirSync(specDir)
    .filter(f => f.endsWith('-spec.ts') && !f.startsWith('_'))
    .sort();

  console.log(`  Found ${files.length} spec files`);

  if (!dryRun) {
    await runMigrations();
  }

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const file of files) {
    const moduleName = moduleNameFromFile(file);
    if (moduleFilter && moduleName !== moduleFilter.toUpperCase()) {
      console.log(`  [skip] ${file} (filtered)`);
      continue;
    }

    const fullPath = resolve(specDir, file);
    const apis = parseApisFromFile(fullPath, moduleName);
    console.log(`  [${file}] ${apis.length} APIs`);

    for (const api of apis) {
      if (!api.id) continue;
      if (dryRun) {
        console.log(`         ${api.id}: ${api.brief}`);
        continue;
      }

      const result = await pool.query(
        `INSERT INTO api_specs (
          id, module_id, layer_id, name, signature, brief, description,
          params, return_type, return_description, version,
          example, example_description, see_also, config_params, timing, status
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
        ON CONFLICT (id) DO UPDATE SET
          signature = EXCLUDED.signature,
          brief     = EXCLUDED.brief,
          params    = EXCLUDED.params,
          status    = EXCLUDED.status`,
        [
          api.id, api.moduleId, api.layerId, api.name, api.signature,
          api.brief, api.description,
          JSON.stringify(api.params),
          api.returnType, api.returnDescription, api.version,
          api.example, api.exampleDescription || '',
          JSON.stringify(api.seeAlso),
          JSON.stringify(api.configParams || []),
          api.timing || '',
          api.status,
        ]
      );
      if ((result.rowCount ?? 0) > 0) totalInserted++;
      else totalSkipped++;
    }
  }

  if (dryRun) {
    console.log(`\n  Dry run: all ${totalInserted} APIs ready`);
  } else {
    console.log(`\n  Done: ${totalInserted} inserted/updated, ${totalSkipped} skipped`);
  }

  await pool.end();
}

seedSpecs().catch(err => {
  console.error('Spec seed failed:', err);
  process.exit(1);
});
