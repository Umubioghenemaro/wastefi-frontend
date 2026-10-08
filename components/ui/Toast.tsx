"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Toast Component
 * Notification system with success, error, warning, and info variants
 */

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all animate-slide-up",
  {
    variants: {
      variant: {
        success: "bg-[var(--card)] border-[var(--success)] text-[var(--foreground)]",
        error: "bg-[var(--card)] border-[var(--error)] text-[var(--foreground)]",
        warning: "bg-[var(--card)] border-[var(--warning)] text-[var(--foreground)]",
        info: "bg-[var(--card)] border-[var(--info)] text-[var(--foreground)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: "text-[var(--success)]",
  error: "text-[var(--error)]",
  warning: "text-[var(--warning)]",
  info: "text-[var(--info)]",
};

export function Toast({
  id,
  variant = "info",
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 200);
  };

  const Icon = iconMap[variant || "info"];
  const iconColor = colorMap[variant || "info"];

  return (
    <div
      className={cn(
        toastVariants({ variant }),
        isExiting && "opacity-0 translate-y-2"
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColor)} />

      {/* Content */}
      <div className="flex-1 space-y-1">
        {title && (
          <p className="text-sm font-semibold leading-none">{title}</p>
        )}
        <p className="text-sm text-[var(--muted-foreground)]">{message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 rounded-md p-1 hover:bg-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export { toastVariants };
