"use client";

import * as React from "react";
import { ToastContainer, type ToastItem } from "@/components/ui/ToastContainer";

/**
 * Toast Hook
 * Global toast notification system
 */

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastOptions {
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

let toastCount = 0;

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: {
  children: React.ReactNode;
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
  maxToasts?: number;
}) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback(
    (options: ToastOptions) => {
      const id = `toast-${++toastCount}`;
      const newToast: ToastItem = {
        id,
        variant: options.variant || "info",
        title: options.title,
        message: options.message,
        duration: options.duration ?? 5000,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Keep only the most recent toasts up to maxToasts
        return updated.slice(-maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const value = React.useMemo(
    () => ({
      toast: addToast,
      success: (message: string, title?: string) =>
        addToast({ message, title, variant: "success" }),
      error: (message: string, title?: string) =>
        addToast({ message, title, variant: "error" }),
      warning: (message: string, title?: string) =>
        addToast({ message, title, variant: "warning" }),
      info: (message: string, title?: string) =>
        addToast({ message, title, variant: "info" }),
      dismiss: removeToast,
      dismissAll,
    }),
    [addToast, removeToast, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} position={position} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
