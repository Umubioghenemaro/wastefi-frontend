import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Skeleton, SkeletonCard } from "@/components/ui";

/**
 * Dashboard Skeleton
 * Loading state for collector dashboard
 */

export function DashboardSkeleton() {
  return (
    <Container>
      <Section>
        {/* Header Skeleton */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </Section>

      <Section spacing="sm">
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="sm">
        {/* Recent Activity Skeleton */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)]"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          
          <Skeleton className="h-10 w-full mt-4 rounded-md" />
        </div>
      </Section>
    </Container>
  );
}
