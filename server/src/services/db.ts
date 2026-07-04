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
const MIGRATION_FINGERPRINT = 'v1.0.0-2026-07-05';

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
  `CREATE TABLE IF NOT EXISTS categories (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    parent_id   TEXT DEFAULT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS blogs (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    content     TEXT NOT NULL DEFAULT '',
    excerpt     TEXT DEFAULT '',
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    tags        TEXT DEFAULT '[]',
    author_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
    cover_image TEXT DEFAULT '',
    view_count  INTEGER NOT NULL DEFAULT 0,
    like_count  INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status)`,
  `CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug)`,
  `CREATE INDEX IF NOT EXISTS idx_blogs_author ON blogs(author_id)`,
  `CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category_id)`,
  `CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published_at) WHERE status = 'published'`,
  `CREATE TABLE IF NOT EXISTS blog_comments (
    id          TEXT PRIMARY KEY,
    blog_id     TEXT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    parent_id   TEXT REFERENCES blog_comments(id) ON DELETE CASCADE,
    status      TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('approved','pending','spam')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_comments_blog ON blog_comments(blog_id)`,
  `CREATE TABLE IF NOT EXISTS api_specs (
    id                  TEXT PRIMARY KEY,
    module_id           TEXT NOT NULL,
    layer_id            TEXT NOT NULL,
    name                TEXT NOT NULL,
    signature           TEXT NOT NULL DEFAULT '',
    brief               TEXT NOT NULL DEFAULT '',
    brief_cn            TEXT DEFAULT '',
    description         TEXT NOT NULL DEFAULT '',
    description_cn      TEXT DEFAULT '',
    params              JSONB DEFAULT '[]'::jsonb,
    return_type         TEXT NOT NULL DEFAULT '',
    return_description  TEXT NOT NULL DEFAULT '',
    version             TEXT NOT NULL DEFAULT '4.4',
    example             TEXT DEFAULT '',
    example_description TEXT DEFAULT '',
    see_also            JSONB DEFAULT '[]'::jsonb,
    config_params       JSONB DEFAULT '[]'::jsonb,
    timing              TEXT DEFAULT '',
    status              TEXT NOT NULL DEFAULT 'standard' CHECK (status IN ('standard','optional','deprecated')),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_specs_module ON api_specs(module_id)`,
  `CREATE INDEX IF NOT EXISTS idx_specs_layer ON api_specs(layer_id)`,
  `CREATE INDEX IF NOT EXISTS idx_specs_name ON api_specs(name)`,

  `CREATE TABLE IF NOT EXISTS registry_modules (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    version       TEXT NOT NULL,
    layer         TEXT NOT NULL CHECK (layer IN ('MCAL','ECUAL','Service','RTE_ASW','Complex','System')),
    description   TEXT NOT NULL DEFAULT '',
    tags          JSONB DEFAULT '[]'::jsonb,
    author        TEXT NOT NULL DEFAULT '',
    author_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
    config_data   TEXT DEFAULT '',
    compatibility JSONB DEFAULT '{}'::jsonb,
    dependencies  JSONB DEFAULT '[]'::jsonb,
    stats         JSONB DEFAULT '{"downloads":0,"rating":0,"reviewCount":0}'::jsonb,
    status        TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published','deprecated')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at  TIMESTAMPTZ
  )`,
  `CREATE INDEX IF NOT EXISTS idx_reg_layer ON registry_modules(layer)`,
  `CREATE INDEX IF NOT EXISTS idx_reg_status ON registry_modules(status)`,
  `CREATE INDEX IF NOT EXISTS idx_reg_name ON registry_modules(name)`,

  `CREATE TABLE IF NOT EXISTS registry_versions (
    id            TEXT PRIMARY KEY,
    module_id     TEXT NOT NULL REFERENCES registry_modules(id) ON DELETE CASCADE,
    version       TEXT NOT NULL,
    release_notes TEXT DEFAULT '',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_reg_ver_module ON registry_versions(module_id)`,

  `CREATE TABLE IF NOT EXISTS registry_reviews (
    id            TEXT PRIMARY KEY,
    module_id     TEXT NOT NULL REFERENCES registry_modules(id) ON DELETE CASCADE,
    user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating        INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    content       TEXT DEFAULT '',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_reg_rev_module ON registry_reviews(module_id)`,
];

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();
  try {
    // 检查 migration 指纹，防止重复跑
    const fpResult = await client.query(
      `SELECT 1 FROM pg_tables WHERE tablename = '_migrations'`
    );
    if (fpResult.rows.length > 0) {
      const applied = await client.query(
        'SELECT fingerprint FROM _migrations WHERE fingerprint = $1',
        [MIGRATION_FINGERPRINT]
      );
      if (applied.rows.length > 0) {
        console.log('[pg] Migrations already applied (fingerprint: ' + MIGRATION_FINGERPRINT + ')');
        return;
      }
    } else {
      // 首次：创建 migration 跟踪表
      await client.query(
        'CREATE TABLE IF NOT EXISTS _migrations (fingerprint TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())'
      );
    }

    for (const sql of MIGRATIONS) {
      await client.query(sql);
    }

    // 记录指纹
    await client.query(
      'INSERT INTO _migrations (fingerprint) VALUES ($1) ON CONFLICT (fingerprint) DO NOTHING',
      [MIGRATION_FINGERPRINT]
    );

    console.log('[pg] Migrations applied successfully (fingerprint: ' + MIGRATION_FINGERPRINT + ')');
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
