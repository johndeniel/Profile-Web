import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';
import type { GitHubRepo } from '@/types';

interface GitHubProjectsProps {
  repos: GitHubRepo[];
}

/** Dot color per language; unknown languages fall back to neutral gray. */
const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  Java: 'bg-orange-500',
};

/** Resolves the language dot color, defaulting to gray for unknowns. */
function getLanguageColor(language: string): string {
  return languageColors[language] ?? 'bg-gray-400';
}

/** Responsive grid of repository cards linking out to GitHub. */
export function GitHubProjects({ repos }: GitHubProjectsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header with repo count */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          GitHub Projects
        </h3>
        <Badge variant="secondary" className="text-xs">
          {repos.length} repos
        </Badge>
      </div>

      {repos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No public repositories found.
        </p>
      ) : (
        /* Repository cards */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/20 hover:shadow-md"
            >
              <ExternalLink
                aria-hidden="true"
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              />

              {/* Name + description */}
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {repo.name}
                </span>
                {repo.description && (
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {repo.description}
                  </p>
                )}
              </div>

              {/* Language + stars footer */}
              <div className="mt-auto flex items-center gap-2 pt-2">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <div
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repo.language)}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {repo.language}
                    </span>
                  </div>
                )}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star aria-hidden="true" className="h-3.5 w-3.5" />
                    <span className="text-xs">{repo.stargazers_count}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
