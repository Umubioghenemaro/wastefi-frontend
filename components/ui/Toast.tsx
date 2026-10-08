"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  /**
   * Unique identifier for the toast
   */
  id: string;
  
  /**
   * Toast message
   */
  message: string;
  
  /**
   * Toast variant (determines color and icon)
   */
  variant?: ToastVariant;
  
  /**
   * Optional title
   */
  title?: string;
  
  /**
   * Auto-dismiss duration in milliseconds (0 to disable)
   */
  duration?: number;
  
  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: string) => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-[var(--success)] text-white",
  error: "bg-[var(--error)] text-white",
  warning: "bg-[var(--warning)] text-white",
  info: "bg-[var(--info)] text-white",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
  error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
  info: <Info className="w-5 h-5 flex-shrink-0" />,
};

/**
 * Toast Component
 * Individual toast notification with icon, message, and close button
 */
export function Toast({
  id,
  message,
  variant = "info",
  title,
  duration = 5000,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm",
        "min-w-[320px] max-w-md w-full",
        "animate-slide-up",
        variantStyles[variant]
      )}
    >
      {/* Icon */}
      <div className="mt-0.5">{variantIcons[variant]}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-sm mb-1 leading-tight">{title}</p>
        )}
        <p className="text-sm leading-relaxed break-words">{message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
