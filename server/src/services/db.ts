/**
 * PostgreSQL 数据库连接和初始化
 *
 * 环境变量:
 *   DATABASE_URL  — 完整连接串 (默认: postgresql://yulecommunity:yulecommunity@localhost:5432/yulecommunity)
 *   PGHOST / PGPORT / PGDATABASE / PGUSER / PGPASSWORD — 拆分配置
 *
 * 迁移方式: 应用启动时自动建表 (CREATE TABLE IF NOT EXISTS)
 */

import pg from 'pg';

const { Pool } = pg;

function getConnectionString(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const host = process.env.PGHOST || 'localhost';
  const port = parseInt(process.env.PGPORT || '5432', 10);
  const database = process.env.PGDATABASE || 'yulecommunity';
  const user = process.env.PGUSER || 'yulecommunity';
  const password = process.env.PGPASSWORD || 'yulecommunity';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

export const pool = new Pool({
  connectionString: getConnectionString(),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('[pg] Unexpected pool error:', err.message);
});

/**
 * 自动建表迁移
 */
const MIGRATIONS = [
  `CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    username    TEXT NOT NULL UNIQUE,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    avatar      TEXT DEFAULT '',
    role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','vip','admin','super_admin')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS bookmarks (
    bookmark_id   TEXT PRIMARY KEY,
    user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_type  TEXT NOT NULL DEFAULT 'article',
    content_id    TEXT NOT NULL,
    title         TEXT NOT NULL DEFAULT '',
    slug          TEXT DEFAULT '',
    description   TEXT DEFAULT '',
    category      TEXT DEFAULT '',
    tags          TEXT DEFAULT '[]',
    author_id     TEXT DEFAULT '',
    author_name   TEXT DEFAULT '',
    author_avatar TEXT DEFAULT '',
    cover_image   TEXT DEFAULT '',
    url           TEXT DEFAULT '',
    collection    TEXT NOT NULL DEFAULT '默认收藏',
    note          TEXT DEFAULT '',
    bookmarked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_pinned     BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order    BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_bookmarks_user_content ON bookmarks(user_id, content_id)`,
  `CREATE TABLE IF NOT EXISTS points_records (
    history_id    TEXT PRIMARY KEY,
    user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action        TEXT NOT NULL,
    points        INTEGER NOT NULL DEFAULT 0,
    balance       INTEGER NOT NULL DEFAULT 0,
    description   TEXT DEFAULT '',
    ref_type      TEXT DEFAULT '',
    ref_id        TEXT DEFAULT '',
    ref_title     TEXT DEFAULT '',
    ref_url       TEXT DEFAULT '',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_points_user ON points_records(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_points_created ON points_records(created_at)`,
];

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();
  try {
    for (const sql of MIGRATIONS) {
      await client.query(sql);
    }
    console.log('[pg] Migrations applied successfully');
  } catch (err) {
    console.error('[pg] Migration failed:', err);
    throw err;
  } finally {
    client.release();
  }
}

/**
 * 查询辅助: 将 JSON 字段从 PostgreSQL TEXT 还原
 */
export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function stringifyTags(tags: string[]): string {
  return JSON.stringify(tags);
}

export default pool;
