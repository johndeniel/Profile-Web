'use client';

import { usePathname } from 'next/navigation';
import { ThemeSwitch } from '@/components/theme-switch';

/** Navbar actions. Visible on the root page only — docs routes keep a clean header. */
export function NavbarActions() {
  const pathname = usePathname();
  if (pathname !== '/') return null;
  return <ThemeSwitch />;
}
