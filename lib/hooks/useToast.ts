"use client";

import { create } from "zustand";
import type { ToastVariant } from "@/components/ui/Toast";

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
  title?: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Global toast store using Zustand
 */
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  
  clearAll: () => {
    set({ toasts: [] });
  },
}));

/**
 * useToast Hook
 * Convenient hook for displaying toast notifications
 * 
 * @example
 * const toast = useToast();
 * 
 * // Show success toast
 * toast.success("Collection submitted successfully!");
 * 
 * // Show error toast with title
 * toast.error("Failed to process payment", { title: "Payment Error" });
 * 
 * // Show custom toast with duration
 * toast.show("Processing...", { variant: "info", duration: 3000 });
 */
export function useToast() {
  const { addToast, removeToast, clearAll } = useToastStore();

  return {
    /**
     * Show a toast notification
     */
    show: (
      message: string,
      options?: {
        variant?: ToastVariant;
        title?: string;
        duration?: number;
      }
    ) => {
      addToast({
        message,
        variant: options?.variant || "info",
        title: options?.title,
        duration: options?.duration,
      });
    },

    /**
     * Show a success toast
     */
    success: (message: string, options?: { title?: string; duration?: number }) => {
      addToast({
        message,
        variant: "success",
        title: options?.title,
        duration: options?.duration,
      });
    },

    /**
     * Show an error toast
     */
    error: (message: string, options?: { title?: string; duration?: number }) => {
      addToast({
        message,
        variant: "error",
        title: options?.title,
        duration: options?.duration,
      });
    },

    /**
     * Show a warning toast
     */
    warning: (message: string, options?: { title?: string; duration?: number }) => {
      addToast({
        message,
        variant: "warning",
        title: options?.title,
        duration: options?.duration,
      });
    },

    /**
     * Show an info toast
     */
    info: (message: string, options?: { title?: string; duration?: number }) => {
      addToast({
        message,
        variant: "info",
        title: options?.title,
        duration: options?.duration,
      });
    },

    /**
     * Dismiss a specific toast
     */
    dismiss: removeToast,

    /**
     * Clear all toasts
     */
    clearAll,
  };
}
