"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toast, ToastContainer } from "@/components/ui";

export type Intent = "success" | "error";
export type ToastItem = {
  id: number;
  content: ReactNode;
  duration?: number;
  intent?: Intent;
  handleClose: () => void;
};

type ToastContextType = {
  showToast: (content: ReactNode, intent?: Intent, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("toast context error");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const pathname = usePathname();

  const showToast = useCallback((content: ReactNode, intent?: Intent, duration = 3000) => {
    const id = Date.now();

    const handleClose = () => {
      setToasts(prev => prev.filter(v => v.id !== id));
    };
    const normalizedContent =
      typeof content === "string" ? <Toast intent={intent}>{content}</Toast> : content;

    const toastItem: ToastItem = {
      id,
      content: normalizedContent,
      duration,
      intent,
      handleClose,
    };

    setToasts(prev => [...prev, toastItem]);
    setTimeout(handleClose, duration);
  }, []);

  // 페이지 이동 시 토스트 제거
  useEffect(() => {
    setToasts([]);
  }, [pathname]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}
