/**
 * 文件存储服务 — 最轻量的持久化方案
 * 将数据以 JSON 文件形式存储在 data/ 目录下
 * 后续可平滑迁移到 SQLite / PostgreSQL
 */
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { StoreData } from '../types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'store.json');

const DEFAULT_DATA: StoreData = {
  users: [],
  bookmarks: [],
  pointsRecords: [],
  pointsStates: {},
};

let cache: StoreData | null = null;

function ensureDataDir(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readStore(): StoreData {
  if (cache) return cache;
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    writeStore(DEFAULT_DATA);
    return { ...DEFAULT_DATA };
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  cache = { ...DEFAULT_DATA, ...JSON.parse(raw) };
  return cache as StoreData;
}

function writeStore(data: StoreData): void {
  ensureDataDir();
  cache = data;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const store = {
  get(): StoreData {
    return readStore();
  },

  save(data: StoreData): void {
    writeStore(data);
  },

  /** 在回调中修改 store 并自动保存 */
  update(updater: (data: StoreData) => void): StoreData {
    const data = readStore();
    updater(data);
    writeStore(data);
    return data;
  },
};
