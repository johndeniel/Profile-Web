import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const apps = [
  {
    id: 'ipref',
    title: 'iPref',
    description:
      'Plan your meals, manage your schedule, and follow your nutritional progress.',
    slug: '/ipref',
    tag: 'Meal planning',
  },
];

/** App cards use the same layout and styling as the Articles section. */
export function AppsList() {
  return (
    <section aria-labelledby="apps-heading" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3
          id="apps-heading"
          className="font-heading text-xl font-bold tracking-tight text-foreground"
        >
          Apps
        </h3>
        <Badge variant="secondary" className="text-xs">
          {apps.length} {apps.length === 1 ? 'app' : 'apps'}
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <Link
            key={app.id}
            href={app.slug}
            className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/20 hover:shadow-md"
          >
            <ArrowRight
              aria-hidden="true"
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                {app.title}
              </span>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {app.description}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5">
                <div
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-emerald-500"
                />
                <span className="text-xs text-muted-foreground">{app.tag}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
