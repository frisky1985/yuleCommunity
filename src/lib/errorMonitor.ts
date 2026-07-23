/**
 * 全局错误监控
 * 捕获未处理的 JS 错误和 Promise rejection
 */
export function setupErrorMonitoring(): void {
  if (typeof window === 'undefined') return;

  // 收集错误日志到 sessionStorage（可被 Sentry/GA 替代）
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
    // Don't prevent default browser error handling
    return false;
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = reason?.message || String(reason) || 'Unhandled Promise rejection';
    logError(msg, 'unhandledrejection');
  });
}
