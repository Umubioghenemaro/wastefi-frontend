"use client";

import * as React from "react";
import { Toast, type ToastProps } from "./Toast";

/**
 * Toast Container
 * Manages and displays toast notifications
 */

export interface ToastItem extends Omit<ToastProps, "onClose"> {
  id: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
}

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-4 left-4",
};

export function ToastContainer({
  toasts,
  onRemove,
  position = "top-right",
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 w-full max-w-md pointer-events-none ${positionClasses[position]}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onRemove} />
      ))}
    </div>
  );
}
