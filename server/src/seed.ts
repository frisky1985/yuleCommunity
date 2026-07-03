/**
 * 种子数据脚本 (PostgreSQL 版)
 * 创建管理员和测试用户
 * 运行: npm run seed
 */
import bcrypt from 'bcryptjs';
import pool, { runMigrations } from './services/db.js';

async function seed() {
  console.log('🌱 Seeding database...');
  await runMigrations();

  // 检查是否已有管理员
  const existing = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', ['admin@yuletech.com']);
  if (existing.rows.length > 0) {
    console.log('⚠️ 数据库已有种子数据，跳过创建');
    await pool.end();
    return;
  }

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const now = new Date();

  await pool.query(
    `INSERT INTO users (id, username, email, password, role, created_at, updated_at) VALUES
     ($1, $2, $3, $4, 'super_admin', $5, $5),
     ($6, $7, $8, $9, 'user', $10, $10)`,
    [
      'admin-001', 'admin', 'admin@yuletech.com', adminPassword, now,
      'user-001', '工程师小王', 'user@yuletech.com', userPassword, now,
    ]
  );

  console.log('✅ Seed complete!');
  console.log('   Admin: admin@yuletech.com / admin123');
  console.log('   User:  user@yuletech.com / user123');

  await pool.end();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
