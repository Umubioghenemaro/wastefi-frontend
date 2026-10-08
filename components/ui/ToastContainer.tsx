"use client";

import { Toast, ToastProps } from "./Toast";

export interface ToastContainerProps {
  /**
   * Array of active toasts
   */
  toasts: ToastProps[];
  
  /**
   * Position of the toast container
   */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const positionStyles = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

/**
 * ToastContainer Component
 * Container that manages and displays all active toasts
 */
export function ToastContainer({
  toasts,
  position = "top-right",
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 flex flex-col gap-3 ${positionStyles[position]} pointer-events-none`}
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
}
