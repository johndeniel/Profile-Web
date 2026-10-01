import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Article } from '@/types';

interface ArticlesListProps {
  articles: Article[];
}

/** Dot color per tag; unknown tags fall back to neutral gray. */
const tagColors: Record<string, string> = {
  Database: 'bg-emerald-500',
  Backend: 'bg-blue-500',
};

function getTagColor(tag: string): string {
  return tagColors[tag] ?? 'bg-gray-400';
}

/** Responsive grid of article cards linking to internal guides. */
export function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header with article count */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Articles
        </h3>
        <Badge variant="secondary" className="text-xs">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </Badge>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No articles published yet.
        </p>
      ) : (
        /* Article cards */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.slug}
              className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/20 hover:shadow-md"
            >
              <ArrowRight
                aria-hidden="true"
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              />

              {/* Title + description */}
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {article.title}
                </span>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {article.description}
                </p>
              </div>

              {/* Tag footer */}
              <div className="mt-auto flex items-center gap-2 pt-2">
                <div className="flex items-center gap-1.5">
                  <div
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${getTagColor(article.tag)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {article.tag}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
