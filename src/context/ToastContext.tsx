import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react';

type ToastKind = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastContextType {
  notify: (message: string, kind?: ToastKind) => void;
}

const MAX_VISIBLE = 3;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const kindIcon: Record<ToastKind, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <CircleAlert size={18} />,
  info: <Info size={18} />
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const notify = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = ++nextId.current;
    setToasts((prev) => [...prev.slice(-(MAX_VISIBLE - 1)), { id, kind, message }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <motion.div className="toast-viewport" role="status" aria-live="polite" layoutRoot>
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              className={`toast toast-${toast.kind}`}
              initial={{ opacity: 0, y: 28, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            >
              <span className="toast-icon">{kindIcon[toast.kind]}</span>
              <span className="toast-message">{toast.message}</span>
              <button type="button" className="toast-close" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
                <X size={14} />
              </button>
              {/* The countdown bar doubles as the auto-dismiss timer, so hovering pauses both */}
              <span className="toast-timer" onAnimationEnd={() => dismiss(toast.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
