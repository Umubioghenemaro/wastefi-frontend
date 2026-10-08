import { ReactNode } from "react";
import { Loader2, ArrowDown } from "lucide-react";
import { usePullToRefresh } from "@/lib/hooks/usePullToRefresh";

/**
 * Pull-to-Refresh Component
 * Visual wrapper for pull-to-refresh functionality
 */

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
  resistance?: number;
  enabled?: boolean;
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  resistance = 2.5,
  enabled = true,
}: PullToRefreshProps) {
  const { containerRef, isRefreshing, pullDistance, isPullActive } = usePullToRefresh({
    onRefresh,
    threshold,
    resistance,
    enabled,
  });

  const pullProgress = Math.min((pullDistance / threshold) * 100, 100);
  const shouldTrigger = pullProgress >= 100;

  return (
    <div ref={containerRef} className="relative">
      {/* Pull Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 ease-out overflow-hidden"
        style={{
          height: isPullActive || isRefreshing ? `${Math.min(pullDistance, threshold)}px` : "0px",
          transform: `translateY(${isPullActive || isRefreshing ? "0" : "-100%"})`,
        }}
      >
        <div className="flex flex-col items-center gap-2 py-4">
          {isRefreshing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--primary)]">
                Refreshing...
              </span>
            </>
          ) : (
            <>
              <div
                className={`transition-transform duration-200 ${
                  shouldTrigger ? "rotate-180" : "rotate-0"
                }`}
              >
                <ArrowDown className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <span className="text-sm font-medium text-[var(--muted-foreground)]">
                {shouldTrigger ? "Release to refresh" : "Pull to refresh"}
              </span>
              {/* Progress Bar */}
              <div className="w-16 h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] transition-all duration-100"
                  style={{ width: `${pullProgress}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${isPullActive || isRefreshing ? pullDistance : 0}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
