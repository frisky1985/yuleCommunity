/**
 * 收藏列表页面
 * @description 展示用户收藏的所有文章
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Trash2,
  ArrowLeft,
  Tag,
  Folder,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { HomeSEOWrapper } from '@/components/seo';

/**
 * 收藏列表页面
 */
export function BookmarksPage() {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark, clearBookmarks, count } = useBookmarks();

  // 返回上一页
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 打开文章
  const handleArticleClick = useCallback((slug: string) => {
    navigate(`#/blog/${slug}`);
  }, [navigate]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <HomeSEOWrapper>
      <div className="min-h-screen bg-background">
        {/* 页面头部 */}
        <div className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    我的收藏
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    共 {count} 篇文章
                  </p>
                </div>
              </div>

              {count > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={clearBookmarks}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  清空收藏
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 收藏列表 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {count === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Bookmark className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">暂无收藏文章</h2>
              <p className="text-muted-foreground mb-6">
                浏览博客时点击收藏按钮，将感兴趣的文章保存到这里
              </p>
              <Button onClick={() => navigate('#/blog')}>
                去看看文章
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {bookmarks.map((bookmark, index) => (
                <motion.article
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleArticleClick(bookmark.slug)}
                    >
                      {/* 分类和收藏日期 */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          <Folder className="w-3 h-3" />
                          {bookmark.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          收藏于 {formatDate(bookmark.bookmarkedAt)}
                        </span>
                      </div>

                      {/* 标题 */}
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {bookmark.title}
                      </h3>

                      {/* 描述 */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {bookmark.description}
                      </p>

                      {/* 作者和标签 */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>作者: {bookmark.author.name}</span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {bookmark.category}
                        </span>
                      </div>
                    </div>

                    {/* 删除按钮 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBookmark(bookmark.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* 提示 */}
          {count > 0 && (
            <div className="mt-8 flex items-center gap-2 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>
                收藏数据仅保存在本地浏览器中，清除浏览器数据将会丢失。
              </span>
            </div>
          )}
        </div>
      </div>
    </HomeSEOWrapper>
  );
}

export default BookmarksPage;
