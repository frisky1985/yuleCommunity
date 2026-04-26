#!/usr/bin/env node

/**
 * 图片优化脚本
 * 将 public/images 下的图片转换为 WebP 格式
 * 使用: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// 检查是否安装了 sharp
function checkSharp() {
  try {
    require.resolve('sharp');
    return true;
  } catch {
    console.log('⚠️  未安装 sharp，正在安装...');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      return true;
    } catch (error) {
      console.error('❌ 安装 sharp 失败:', error.message);
      return false;
    }
  }
}

// 获取所有图片文件
function getImageFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (SUPPORTED_FORMATS.includes(path.extname(item).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// 转换图片为 WebP
async function convertToWebP(imagePath) {
  const sharp = require('sharp');
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // 如果已经存在 WebP 版本，跳过
  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  跳过: ${path.basename(imagePath)} (WebP 已存在)`);
    return;
  }
  
  try {
    await sharp(imagePath)
      .webp({ 
        quality: 85,
        effort: 6,
      })
      .toFile(webpPath);
    
    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅  转换成功: ${path.basename(imagePath)} -> ${path.basename(webpPath)} (节省 ${savings}%)`);
  } catch (error) {
    console.error(`❌  转换失败: ${path.basename(imagePath)}`, error.message);
  }
}

// 主函数
async function main() {
  console.log('📷  图片优化工具');
  console.log('========================\n');
  
  if (!checkSharp()) {
    process.exit(1);
  }
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`⚠️  图片目录不存在: ${IMAGES_DIR}`);
    process.exit(1);
  }
  
  const images = getImageFiles(IMAGES_DIR);
  
  if (images.length === 0) {
    console.log('ℹ️  未找到需要转换的图片');
    process.exit(0);
  }
  
  console.log(`📂  找到 ${images.length} 个图片\n`);
  
  for (const image of images) {
    await convertToWebP(image);
  }
  
  console.log('\n✨  处理完成！');
}

main().catch(console.error);
