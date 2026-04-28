/**
 * OG 图片生成脚本
 * @description 使用 Sharp 库为博客文章生成 Open Graph 分享图片 (1200x630px)
 * @usage npx tsx scripts/generate-og-images.ts
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { articles as blogArticles } from '../src/data/blog/articles';

// OG 图片配置
const OG_CONFIG = {
  width: 1200,
  height: 630,
  outputDir: 'public/images/og',
  colors: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#60A5FA',
    background: '#0F172A',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
  },
} as const;

// 确保输出目录存在
function ensureOutputDir(): void {
  const dir = path.resolve(OG_CONFIG.outputDir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`创建输出目录: ${dir}`);
  }
}

// 生成 SVG 文本图片
function createTextImage(text: string, options: {
  width: number;
  height: number;
  fontSize: number;
  color: string;
  fontWeight?: string;
  lineHeight?: number;
  maxLines?: number;
}): string {
  const { width, height, fontSize, color, fontWeight = 'normal', lineHeight = 1.4, maxLines = 3 } = options;
  
  // 简单文本换行
  const charsPerLine = Math.floor(width / (fontSize * 0.6));
  const lines: string[] = [];
  let currentLine = '';
  
  for (const char of text) {
    if (currentLine.length >= charsPerLine) {
      lines.push(currentLine);
      currentLine = char;
      if (lines.length >= maxLines - 1) break;
    } else {
      currentLine += char;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  
  // 如果文本被截断，添加省略号
  if (lines.length === maxLines && text.length > charsPerLine * maxLines) {
    const lastLine = lines[lines.length - 1];
    if (lastLine.length > 3) {
      lines[lines.length - 1] = lastLine.slice(0, -3) + '...';
    }
  }

  const lineHeightPx = fontSize * lineHeight;
  const totalHeight = lines.length * lineHeightPx;
  const startY = (height - totalHeight) / 2 + fontSize;

  const lineSVGs = lines.map((line, i) => 
    `<text x="${width / 2}" y="${startY + i * lineHeightPx}" 
      font-family="Noto Sans SC, Microsoft YaHei, sans-serif" 
      font-size="${fontSize}" 
      font-weight="${fontWeight}"
      fill="${color}" 
      text-anchor="middle">${escapeXml(line)}</text>`
  ).join('');

  return lineSVGs;
}

// XML 转义
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// 生成 OG SVG
function generateOGSVG(article: typeof blogArticles[0]): string {
  const { width, height, colors } = OG_CONFIG;
  const { title, description, author, category, publishDate, readTime } = article;

  // 格式化日期
  const dateStr = new Date(publishDate).toLocaleDateString('zh-CN');

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0F172A"/>
        <stop offset="50%" style="stop-color:#1e293b"/>
        <stop offset="100%" style="stop-color:#0f172a"/>
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- 背景 -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    
    <!-- 装饰线条 -->
    <g opacity="0.3">
      <line x1="40" y1="100" x2="40" y2="40" stroke="${colors.primary}" stroke-width="4"/>
      <line x1="40" y1="40" x2="100" y2="40" stroke="${colors.primary}" stroke-width="4"/>
      <line x1="${width - 40}" y1="${height - 100}" x2="${width - 40}" y2="${height - 40}" stroke="${colors.primary}" stroke-width="4"/>
      <line x1="${width - 40}" y1="${height - 40}" x2="${width - 100}" y2="${height - 40}" stroke="${colors.primary}" stroke-width="4"/>
    </g>
    
    <!-- 水平装饰线 -->
    <g opacity="0.2" stroke="${colors.secondary}" stroke-width="2">
      <line x1="0" y1="400" x2="${width}" y2="400"/>
      <line x1="0" y1="430" x2="${width}" y2="430"/>
      <line x1="0" y1="460" x2="${width}" y2="460"/>
      <line x1="0" y1="490" x2="${width}" y2="490"/>
      <line x1="0" y1="520" x2="${width}" y2="520"/>
    </g>
    
    <!-- 圆形装饰 -->
    <circle cx="${width - 150}" cy="150" r="80" fill="${colors.accent}" opacity="0.1"/>
    
    <!-- Logo -->
    <circle cx="80" cy="70" r="16" fill="${colors.primary}"/>
    <text x="105" y="82" font-family="Noto Sans SC, sans-serif" font-size="48" font-weight="bold" fill="${colors.text}">YuleTech</text>
    <text x="105" y="110" font-family="Noto Sans SC, sans-serif" font-size="20" fill="${colors.textMuted}">汽车基础软件开源社区</text>
    
    <!-- 分类标签 -->
    <rect x="60" y="160" rx="6" ry="6" width="${category.length * 24 + 24}" height="36" fill="${colors.primary}"/>
    <text x="${60 + (category.length * 24 + 24) / 2}" y="185" font-family="Noto Sans SC, sans-serif" font-size="20" fill="${colors.text}" text-anchor="middle">${escapeXml(category)}</text>
    
    <!-- 标题 -->
    ${createTextImage(title, { 
      width: width - 120, 
      height: 200, 
      fontSize: 52, 
      color: colors.text,
      fontWeight: 'bold',
      lineHeight: 1.3,
      maxLines: 2
    }).replace(/x="600"/g, 'x="60"').replace(/text-anchor="middle"/g, 'text-anchor="start"')}
    
    <!-- 描述 -->
    ${createTextImage(description, { 
      width: width - 120, 
      height: 100, 
      fontSize: 28, 
      color: colors.textMuted,
      lineHeight: 1.4,
      maxLines: 2
    }).replace(/x="600"/g, 'x="60"').replace(/text-anchor="middle"/g, 'text-anchor="start"')}
    
    <!-- 底部信息 -->
    <text x="60" y="${height - 40}" font-family="Noto Sans SC, sans-serif" font-size="20" fill="${colors.textMuted}">作者: ${escapeXml(author.name)}</text>
    <text x="280" y="${height - 40}" font-family="Noto Sans SC, sans-serif" font-size="20" fill="${colors.textMuted}">发布于: ${dateStr}</text>
    <text x="520" y="${height - 40}" font-family="Noto Sans SC, sans-serif" font-size="20" fill="${colors.textMuted}">阅读约 ${readTime} 分钟</text>
    <text x="${width - 60}" y="${height - 40}" font-family="Noto Sans SC, sans-serif" font-size="20" fill="${colors.accent}" text-anchor="end">yuletech.cn</text>
  </svg>`;
}

// 生成默认 OG 图片 SVG
function generateDefaultOGSVG(): string {
  const { width, height, colors } = OG_CONFIG;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0F172A"/>
        <stop offset="50%" style="stop-color:#1e293b"/>
        <stop offset="100%" style="stop-color:#0f172a"/>
      </linearGradient>
    </defs>
    
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    
    <!-- 装饰 -->
    <circle cx="${width / 2}" cy="200" r="80" fill="${colors.primary}"/>
    <circle cx="${width - 150}" cy="150" r="80" fill="${colors.accent}" opacity="0.1"/>
    
    <!-- 标题 -->
    <text x="${width / 2}" y="360" font-family="Noto Sans SC, sans-serif" font-size="72" font-weight="bold" fill="${colors.text}" text-anchor="middle">YuleTech</text>
    <text x="${width / 2}" y="420" font-family="Noto Sans SC, sans-serif" font-size="36" fill="${colors.textMuted}" text-anchor="middle">汽车基础软件开源社区</text>
    <text x="${width / 2}" y="470" font-family="Noto Sans SC, sans-serif" font-size="28" fill="${colors.textMuted}" text-anchor="middle">AutoSAR BSW | 开发工具链 | 学习成长 | 硬件开发</text>
    
    <text x="${width / 2}" y="560" font-family="Noto Sans SC, sans-serif" font-size="24" fill="${colors.accent}" text-anchor="middle">yuletech.cn</text>
  </svg>`;
}

// 生成单个 OG 图片
async function generateOGImage(article: typeof blogArticles[0], index: number): Promise<void> {
  const svg = generateOGSVG(article);
  const outputPath = path.resolve(OG_CONFIG.outputDir, `${article.slug}.png`);

  await sharp(Buffer.from(svg))
    .resize(OG_CONFIG.width, OG_CONFIG.height)
    .png({ quality: 90 })
    .toFile(outputPath);

  console.log(`[${index + 1}/${blogArticles.length}] 生成: ${article.slug}.png`);
}

// 生成默认 OG 图片
async function generateDefaultOGImage(): Promise<void> {
  const svg = generateDefaultOGSVG();
  const outputPath = path.resolve(OG_CONFIG.outputDir, 'default.png');

  await sharp(Buffer.from(svg))
    .resize(OG_CONFIG.width, OG_CONFIG.height)
    .png({ quality: 90 })
    .toFile(outputPath);

  console.log(`✓ 生成默认 OG 图片: default.png`);
}

// 主函数
async function main(): Promise<void> {
  console.log('🎨 开始生成 OG 图片...\n');
  
  const startTime = Date.now();
  
  // 确保输出目录
  ensureOutputDir();
  
  // 生成默认图片
  await generateDefaultOGImage();
  console.log('');
  
  // 生成所有博客文章的 OG 图片
  for (let i = 0; i < blogArticles.length; i++) {
    await generateOGImage(blogArticles[i], i);
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`\n✅ 完成！共生成 ${blogArticles.length + 1} 张图片，耗时 ${duration}s`);
  console.log(`📁 输出目录: ${path.resolve(OG_CONFIG.outputDir)}`);
}

// 运行
main().catch((error) => {
  console.error('❌ 生成失败:', error);
  process.exit(1);
});
