'use client';

import { Layout } from 'nextra-theme-docs';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

type SiteLayoutProps = ComponentProps<typeof Layout>;

/** Keep app information and technical articles in separate documentation trees. */
export function SiteLayout({ pageMap, ...props }: SiteLayoutProps) {
  const pathname = usePathname();
  const isIPref = pathname === '/ipref' || pathname.startsWith('/ipref/');
  const scopedPageMap = pageMap.filter((item) => {
    if (!('name' in item)) return true;
    return isIPref ? item.name === 'ipref' : item.name !== 'ipref';
  });

  return <Layout {...props} pageMap={scopedPageMap} />;
}
