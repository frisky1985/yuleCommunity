import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
let addToastFn: ((message: string, type?: Toast['type']) => void) | null = null;

/** 全局 toast 函数 — 可在任何地方调用 */
export function toast(message: string, type: Toast['type'] = 'info') {
  addToastFn?.(message, type);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-right-2 ${
            t.type === 'success'
              ? 'bg-green-500 text-white'
              : t.type === 'error'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-card border border-border text-foreground'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>,
    document.body
  );
}
