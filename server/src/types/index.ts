// 核心类型定义

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;          // bcrypt hash
  avatar?: string;
  role: 'user' | 'vip' | 'admin' | 'super_admin';
  createdAt: string;
  updatedAt: string;
}

export interface PublicUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: User['role'];
}

export interface Bookmark {
  bookmarkId: string;
  userId: string;
  content: {
    type: 'article' | 'module' | 'tool' | 'document';
    contentId: string;
    title: string;
    slug?: string;
    description?: string;
    category?: string;
    tags?: string[];
    author?: {
      id: string;
      name: string;
      avatar?: string;
    };
    coverImage?: string;
    url?: string;
  };
  collection: string;
  note?: string;
  bookmarkedAt: string;
  isPinned: boolean;
  sortOrder: number;
}

export interface PointsRecord {
  historyId: string;
  userId: string;
  action: string;
  points: number;
  balance: number;
  description: string;
  reference?: {
    type: string;
    id: string;
    title: string;
    url?: string;
  };
  createdAt: string;
}

export interface PointsState {
  total: number;
  todayEarned: number;
  todayDate: string;
}

export interface AuthPayload {
  userId: string;
  username: string;
  role: User['role'];
}

// 存储数据结构
export interface StoreData {
  users: User[];
  bookmarks: Bookmark[];
  pointsRecords: PointsRecord[];
  pointsStates: Record<string, PointsState>;
}
