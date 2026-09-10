'use client';

import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, GitFork } from 'lucide-react';
import type { GitHubRepo } from '@/types';

interface GitHubProjectsProps {
  repos: GitHubRepo[];
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-orange-500',
  'C++': 'bg-pink-500',
  C: 'bg-gray-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-amber-600',
  Ruby: 'bg-red-500',
  PHP: 'bg-purple-500',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-400',
  Dart: 'bg-sky-500',
  HTML: 'bg-orange-600',
  CSS: 'bg-blue-400',
  Shell: 'bg-green-400',
  Markdown: 'bg-gray-400',
};

export function GitHubProjects({ repos }: GitHubProjectsProps) {
  return (
    <div className="flex flex-col gap-4 pt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          GitHub Projects
        </h3>
        <Badge variant="secondary" className="text-xs">
          {repos.length} repos
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/20 hover:shadow-md"
          >
            <ExternalLink className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                  {repo.name}
                </span>
              </div>
              {repo.description && (
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>
              )}
            </div>
            <div className="mt-auto flex items-center gap-2 pt-2">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {repo.language}
                  </span>
                </div>
              )}
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3.5 w-3.5" />
                  <span className="text-xs">{repo.stargazers_count}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
