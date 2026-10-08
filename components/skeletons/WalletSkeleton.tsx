import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui";

/**
 * Wallet Skeleton
 * Loading state for wallet page
 */

export function WalletSkeleton() {
  return (
    <Container>
      <Section>
        {/* Header Skeleton */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </Section>

      <Section spacing="sm">
        {/* Balance Card Skeleton */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="space-y-6">
            {/* Main Balance */}
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-40" />
            </div>

            {/* Secondary Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-3 w-28 mb-2" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div>
                <Skeleton className="h-3 w-28 mb-2" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Skeleton className="h-11 flex-1 rounded-md" />
              <Skeleton className="h-11 flex-1 rounded-md" />
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="sm">
        {/* Filter Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
      </Section>

      <Section spacing="sm">
        {/* Transactions List Skeleton */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <div className="p-4 border-b border-[var(--border)]">
            <Skeleton className="h-5 w-40" />
          </div>
          
          <div className="divide-y divide-[var(--border)]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  );
}
