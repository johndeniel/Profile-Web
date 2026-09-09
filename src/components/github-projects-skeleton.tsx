import { Skeleton } from '@/components/ui/skeleton';

export function GitHubProjectsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-35 flex-col gap-3 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-28" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-8 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
