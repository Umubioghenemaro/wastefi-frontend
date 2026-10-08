"use client";

import { ToastContainer } from "@/components/ui/ToastContainer";
import { useToastStore } from "@/lib/hooks/useToast";

/**
 * ToastProvider Component
 * Provides toast notification functionality throughout the app
 * Place this component at the root layout level
 */
export function ToastProvider() {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastContainer
      toasts={toasts.map((toast) => ({
        ...toast,
        onDismiss: removeToast,
      }))}
      position="top-right"
    />
  );
}
