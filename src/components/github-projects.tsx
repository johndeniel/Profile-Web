'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

interface GitHubProjectsProps {
  username: string;
}

export function GitHubProjects({ username }: GitHubProjectsProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
          {
            headers: token ? { Authorization: `token ${token}` } : {},
          }
        );
        const data = await res.json();
        setRepos(data.filter((repo: GitHubRepo) => !repo.fork));
      } catch (error) {
        console.error('Failed to fetch repos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, [username]);

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">Loading projects...</div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        GitHub Projects
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-1 rounded-md border border-border p-3 transition-colors hover:bg-muted"
          >
            <ExternalLink className="absolute right-2 top-2 h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground group-hover:text-primary">
                {repo.name}
              </span>
            </div>
            {repo.description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {repo.description}
              </p>
            )}
            <div className="mt-1 flex items-center gap-2">
              {repo.language && (
                <Badge variant="outline" className="py-0 text-xs">
                  {repo.language}
                </Badge>
              )}
              {repo.stargazers_count > 0 && (
                <Badge variant="secondary" className="gap-1 py-0 text-xs">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </Badge>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
