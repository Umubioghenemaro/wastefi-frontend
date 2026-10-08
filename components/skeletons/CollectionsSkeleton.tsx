import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui";

/**
 * Collections Skeleton
 * Loading state for collections page
 */

export function CollectionsSkeleton() {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-center"
            >
              <Skeleton className="h-7 w-16 mx-auto mb-2" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                className="h-9 w-24 rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Sort Controls Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>

        {/* Collections List Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div className="flex items-start gap-4">
                {/* Image Skeleton */}
                <Skeleton className="h-20 w-20 rounded-md flex-shrink-0" />
                
                {/* Content Skeleton */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
