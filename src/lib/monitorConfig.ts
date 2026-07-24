/**
 * 错误监控配置
 * 支持 Sentry 和基础 window.onerror 监控
 * 设置 VITE_SENTRY_DSN 环境变量即可启用 Sentry
 */

export const config = {
  sentryDsn: import.meta.env.VITE_SENTRY_DSN as string | undefined,
  environment: import.meta.env.PROD ? 'production' : 'development',
  release: 'master-v2.2.0',
};
