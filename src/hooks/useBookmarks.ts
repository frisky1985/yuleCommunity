/**
 * 收藏功能 Hook
 * @description 管理用户收藏的文章，支持本地存储持久化
 */

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { BlogArticle } from '@/types/blog';

// 收藏文章数据结构
export interface BookmarkedArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  author: {
    id: string;
    name: string;
  };
  bookmarkedAt: string;
}

const BOOKMARKS_KEY = 'yuletech:bookmarks';
const MAX_BOOKMARKS = 100; // 最多存储数量

/**
 * 收藏管理 Hook
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkedArticle[]>(BOOKMARKS_KEY, []);

  /**
   * 添加收藏
   */
  const addBookmark = useCallback((article: BlogArticle) => {
    setBookmarks(prev => {
      // 检查是否已存在
      if (prev.some(b => b.id === article.id)) {
        return prev;
      }

      const newBookmark: BookmarkedArticle = {
        id: article.id,
        title: article.title,
        slug: article.slug,
        description: article.description,
        category: article.category,
        author: {
          id: article.author.id,
          name: article.author.name,
        },
        bookmarkedAt: new Date().toISOString(),
      };

      // 保持最新的收藏在前面，超出限制则删除最旧的
      const updated = [newBookmark, ...prev].slice(0, MAX_BOOKMARKS);
      return updated;
    });
  }, [setBookmarks]);

  /**
   * 移除收藏
   */
  const removeBookmark = useCallback((articleId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== articleId));
  }, [setBookmarks]);

  /**
   * 切换收藏状态
   */
  const toggleBookmark = useCallback((article: BlogArticle) => {
    const isBookmarked = bookmarks.some(b => b.id === article.id);
    if (isBookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
    return !isBookmarked;
  }, [bookmarks, addBookmark, removeBookmark]);

  /**
   * 检查是否已收藏
   */
  const isBookmarked = useCallback((articleId: string) => {
    return bookmarks.some(b => b.id === articleId);
  }, [bookmarks]);

  /**
   * 清空所有收藏
   */
  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, [setBookmarks]);

  /**
   * 收藏数量
   */
  const count = useMemo(() => bookmarks.length, [bookmarks]);

  return {
    bookmarks,
    count,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
  };
}

export default useBookmarks;
