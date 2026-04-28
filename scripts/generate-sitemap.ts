/**
 * Sitemap 生成脚本
 * @description 自动生成 sitemap.xml，包含所有页面和博客文章
 */

import * as fs from 'fs';
import * as path from 'path';

// 配置
const CONFIG = {
  baseUrl: 'https://frisky1985.github.io/yuleCommunity',
  outputPath: 'public/sitemap.xml',
  // 静态路由列表
  staticRoutes: [
    { path: '/', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/opensource', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/toolchain', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/learning', priority: 0.8, changefreq: 'weekly' as const },
    { path: '/hardware', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/blog', priority: 0.9, changefreq: 'daily' as const },
    { path: '/community', priority: 0.7, changefreq: 'weekly' as const },
    { path: '/forum', priority: 0.7, changefreq: 'daily' as const },
    { path: '/qa', priority: 0.7, changefreq: 'daily' as const },
    { path: '/events', priority: 0.6, changefreq: 'weekly' as const },
    { path: '/docs', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/downloads', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/organization', priority: 0.5, changefreq: 'monthly' as const },
    { path: '/workspace', priority: 0.5, changefreq: 'monthly' as const },
    { path: '/analytics', priority: 0.4, changefreq: 'monthly' as const },
    { path: '/sso', priority: 0.4, changefreq: 'monthly' as const },
  ],
};

// 博客文章数据（导入自数据文件）
interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  updatedAt?: string;
}

/**
 * 动态导入博客文章数据
 */
async function getBlogArticles(): Promise<BlogArticle[]> {
  try {
    // 导入博客数据
    const { articles } = await import('../src/data/blog/articles.js');
    return articles.map((article: any) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      publishDate: article.publishDate,
      updatedAt: article.updatedAt || article.publishDate,
    }));
  } catch (error) {
    console.warn('⚠️ 无法动态导入博客数据，使用空数组');
    return [];
  }
}

/**
 * 生成单个 URL 节点
 */
function generateUrlNode(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: number
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

/**
 * 生成 Sitemap XML
 */
function generateSitemap(
  staticRoutes: typeof CONFIG.staticRoutes,
  articles: BlogArticle[]
): string {
  const today = new Date().toISOString().split('T')[0];
  
  // 静态页面 URL
  const staticUrls = staticRoutes.map((route) => {
    const loc = `${CONFIG.baseUrl}${route.path}`;
    return generateUrlNode(loc, today, route.changefreq, route.priority);
  });

  // 博客文章 URL
  const articleUrls = articles.map((article) => {
    const loc = `${CONFIG.baseUrl}/blog/${article.slug}`;
    const lastmod = (article.updatedAt || article.publishDate).split('T')[0];
    return generateUrlNode(loc, lastmod, 'weekly', 0.7);
  });

  // 组合 XML
  const urls = [...staticUrls, ...articleUrls].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * 主函数
 */
async function main() {
  console.log('🔍 开始生成 Sitemap...');

  try {
    // 获取博客文章
    const articles = await getBlogArticles();
    console.log(`📋 找到 ${articles.length} 篇博客文章`);

    // 生成 XML
    const sitemap = generateSitemap(CONFIG.staticRoutes, articles);

    // 确保输出目录存在
    const outputDir = path.dirname(CONFIG.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(CONFIG.outputPath, sitemap, 'utf-8');

    // 统计信息
    const urlCount = CONFIG.staticRoutes.length + articles.length;
    console.log(`✅ Sitemap 生成成功！`);
    console.log(`   文件: ${CONFIG.outputPath}`);
    console.log(`   URL 数量: ${urlCount}`);
    console.log(`   静态页面: ${CONFIG.staticRoutes.length}`);
    console.log(`   博客文章: ${articles.length}`);
  } catch (error) {
    console.error('❌ Sitemap 生成失败:', error);
    process.exit(1);
  }
}

main();
