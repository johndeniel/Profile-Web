'use client';

import { useEffect, useState } from 'react';
import type { GitHubRepo } from '@/types';

export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        setError('Failed to fetch repos');
        console.error('Failed to fetch repos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, [username]);

  return { repos, loading, error };
}
