# Changelog v1.1.1

## 修复 (Bug Fixes)

### 图片路径修复
- **问题**: 4张 Feature 卡片图片在 GitHub Pages 部署环境下显示为空白
- **原因**: 图片使用绝对路径 `/images/xxx.png`，在子路径部署 `/yuleCommunity/` 下无法正确加载
- **修复**: 改为使用动态路径 `${import.meta.env.BASE_URL}images/feature-xxx.png`
- **影响文件**: `src/components/Features.tsx`

## 文件变更

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `src/components/Features.tsx` | 修改 | 4张图片路径改为动态路径 |
| `package.json` | 修改 | 版本号 1.1.0 -> 1.1.1 |

## 部署信息

- **部署时间**: 2025-04-28
- **部署方式**: GitHub Pages (gh-pages 分支)
- **访问地址**: https://frisky1985.github.io/yuleCommunity/

---

**Full Changelog**: https://github.com/frisky1985/yuleCommunity/compare/v1.1.0...v1.1.1
