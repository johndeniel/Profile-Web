'use client';

import { useEffect, useState } from 'react';
import type { GitHubRepo } from '@/types';

/**
 * Fetches a user's public repos (newest first), excluding forks.
 * An empty username is a misconfiguration: no request is made and an error
 * is surfaced instead of fetching garbage.
 */
export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(() => username.trim().length > 0);
  const [error, setError] = useState<string | null>(() =>
    username.trim().length > 0 ? null : 'GitHub username is not configured'
  );

  useEffect(() => {
    if (!username) return;

    // Ignore late responses if the component unmounts mid-request.
    let cancelled = false;

    async function fetchRepos() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
          {
            headers: token ? { Authorization: `token ${token}` } : {},
          }
        );
        if (!res.ok) {
          throw new Error(`GitHub API responded with ${res.status}`);
        }
        const data: GitHubRepo[] = await res.json();
        if (!cancelled) setRepos(data.filter((repo) => !repo.fork));
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch repos');
          console.error('Failed to fetch repos:', err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading, error };
}
