/**
 * 种子数据脚本 (PostgreSQL 版)
 * 创建管理员和测试用户 + 默认分类 + 示例文章
 * 运行: npm run seed
 */
import bcrypt from 'bcryptjs';
import pool, { runMigrations } from './services/db.js';
import { getSeedCategories, getSeedArticles } from './data/seed-content.js';

async function seed() {
  const checkEmptyOnly = process.argv.includes('--if-empty');
  console.log('🌱 Seeding database...');
  await runMigrations();

  // 检查是否已有管理员
  const existing = await pool.query(
    'SELECT id FROM users LIMIT 1'
  );
  if (existing.rows.length > 0) {
    if (checkEmptyOnly) {
      console.log('ℹ️  用户表非空，--if-empty 模式下跳过 seed');
      await pool.end();
      return;
    }
    // 无 --if-empty 时检查管理员是否存在精确匹配
    const adminExists = await pool.query(
      'SELECT id FROM users WHERE email = $1 LIMIT 1',
      ['admin@yuletech.com']
    );
    if (adminExists.rows.length > 0) {
      console.log('⚠️ 数据库已有种子数据，跳过创建');
      await pool.end();
      return;
    }
  }

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const now = new Date();

  // ── 用户 ──
  await pool.query(
    `INSERT INTO users (id, username, email, password, role, created_at, updated_at) VALUES
     ($1, $2, $3, $4, 'super_admin', $5, $5),
     ($6, $7, $8, $9, 'user', $10, $10)`,
    [
      'admin-001', 'admin', 'admin@yuletech.com', adminPassword, now,
      'user-001', '工程师小王', 'user@yuletech.com', userPassword, now,
    ]
  );
  console.log('  ✅ Users created');

  // ── 分类 ──
  const categories = getSeedCategories();
  for (const c of categories) {
    await pool.query(
      `INSERT INTO categories (id, name, slug, description, sort_order) VALUES ($1, $2, $3, $4, $5)`,
      [c.id, c.name, c.slug, c.desc, c.order]
    );
  }
  console.log(`  ✅ ${categories.length} categories created`);

  // ── 示例文章 ──
  const articles = getSeedArticles(now);
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const id = `blog-00${i + 1}`;
    const viewCount = Math.floor(Math.random() * 200) + 30;
    await pool.query(
      `INSERT INTO blogs (id, title, slug, content, excerpt, category_id, tags, author_id, status, published_at, view_count, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $10, $10)`,
      [id, a.title, a.slug, a.content, a.excerpt, a.category_id,
       JSON.stringify(a.tags), 'admin-001', 'published', a.publishedAt, viewCount]
    );
  }
  console.log(`  ✅ ${articles.length} articles created`);

  console.log('\n✅ Seed complete!');
  console.log('   Admin: admin@yuletech.com / admin123');
  console.log('   User:  user@yuletech.com / user123');

  await pool.end();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
