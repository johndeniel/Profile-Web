import { Skeleton } from '@/components/ui/skeleton';

/** Number of placeholder cards; approximates a typical repo result set. */
const PLACEHOLDER_COUNT = 6;

/**
 * Loading placeholder for the GitHub projects section. Mirrors the real
 * card grid (columns, spacing, and row rhythm) to avoid layout shift when
 * the data arrives.
 */
export function GitHubProjectsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          GitHub Projects
        </h3>
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>

      <span className="sr-only">Loading GitHub projects…</span>

      {/* Placeholder cards (hidden from assistive tech) */}
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {/* Index keys are intentional: the list is static and never reorders. */}
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-35 flex-col gap-3 rounded-lg border border-border bg-card p-4"
          >
            {/* Title + description lines */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-28" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>

            {/* Language + stats footer */}
            <div className="mt-auto flex items-center gap-2 pt-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="ml-auto h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
