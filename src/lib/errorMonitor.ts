/**
 * 全局错误监控
 * 集成 Sentry + 基础 window.onerror + unhandledrejection
 */
import { config } from './monitorConfig';

let sentryInit: (() => void) | null = null;

// 动态加载 Sentry（仅当配置了 DSN）
async function initSentry() {
  if (!config.sentryDsn) return;
  try {
    const Sentry = await import('@sentry/react');
    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment,
      release: config.release,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 0.1,
    });
    sentryInit = () => {};
    console.log('[Monitor] Sentry initialized');
  } catch (e) {
    console.warn('[Monitor] Sentry init failed:', e);
  }
}

export function setupErrorMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Init Sentry (async, non-blocking)
  initSentry();

  // 收集错误日志到 sessionStorage
  const logError = (message: string, source?: string) => {
    try {
      const logs = JSON.parse(sessionStorage.getItem('yule-error-log') || '[]');
      logs.push({
        message,
        source,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
      sessionStorage.setItem('yule-error-log', JSON.stringify(logs.slice(-50)));
    } catch { /* ignore */ }
  };

  window.onerror = (message, source, lineno, colno, error) => {
    const msg = typeof message === 'string' ? message : 'Unknown error';
    logError(msg, source || 'unknown');
    return false;
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = reason?.message || String(reason) || 'Unhandled Promise rejection';
    logError(msg, 'unhandledrejection');
  });
}
