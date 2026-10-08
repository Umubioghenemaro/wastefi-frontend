import { cn } from "@/lib/utils";

/**
 * Skeleton Component
 * Used for loading states to improve perceived performance
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  ...props
}: SkeletonProps) {
  const animationClass =
    animation === "pulse"
      ? "animate-pulse"
      : animation === "wave"
      ? "animate-shimmer"
      : "";

  const variantClass =
    variant === "text"
      ? "h-4 rounded"
      : variant === "circular"
      ? "rounded-full"
      : "rounded-md";

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        "bg-[var(--muted)] relative overflow-hidden",
        variantClass,
        animationClass,
        className
      )}
      style={style}
      {...props}
    />
  );
}

/**
 * Skeleton variants for common use cases
 */

export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? "w-4/5" : ""}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--card)] p-4",
        className
      )}
    >
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
}
