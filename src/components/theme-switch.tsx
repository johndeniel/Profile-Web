'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Light/dark toggle for the navbar. Both icons always render — CSS cross-fades
 * them — so there is no theme-dependent output to cause hydration mismatch.
 * Theme context comes from the Nextra docs layout's provider.
 */
export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun
        aria-hidden="true"
        className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
