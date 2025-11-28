"use client";

import { ToastItem } from "@/providers/toast-provider";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import IcClose from "@/assets/icons/ic-cancel.svg";
import cn from "@/lib/cn";
import { toastBox, toastContainer } from "./toast.style";

export default function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(
    <div className={toastContainer}>
      {toasts.map(toast => {
        const { id, intent, content, handleClose } = toast;
        return (
          <div key={id} className={cn(toastBox({ intent: intent }))}>
            {content}
            <button onClick={() => handleClose()}>
              <IcClose className="h-4.5 w-4.5 text-gray-400" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
