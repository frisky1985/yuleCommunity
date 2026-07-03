/**
 * 种子数据脚本 — 创建管理员和测试用户
 * 运行: npm run seed
 */
import bcrypt from 'bcryptjs';
import { store } from './services/storage.js';

async function seed() {
  console.log('🌱 Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const initialUsers = [
    {
      id: 'admin-001',
      username: 'admin',
      email: 'admin@yuletech.com',
      password: adminPassword,
      role: 'super_admin',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'user-001',
      username: '工程师小王',
      email: 'user@yuletech.com',
      password: userPassword,
      role: 'user',
      createdAt: '2026-03-15T00:00:00.000Z',
      updatedAt: '2026-03-15T00:00:00.000Z',
    },
  ];

  const existingData = store.get();

  if (existingData.users.length > 0) {
    console.log('⚠️ 数据库已有数据，跳过种子创建');
    return;
  }

  store.save({
    users: initialUsers,
    bookmarks: [],
    pointsRecords: [],
    pointsStates: {},
  });

  console.log('✅ Seed complete!');
  console.log('   Admin: admin@yuletech.com / admin123');
  console.log('   User:  user@yuletech.com / user123');
}

seed().catch(console.error);
