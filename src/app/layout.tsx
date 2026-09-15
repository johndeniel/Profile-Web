import { Layout, Navbar } from 'nextra-theme-docs';
import { ThemeSwitch } from '@/components/theme-switch';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'nextra-theme-docs/style.css';
import '../styles/globals.css';

/** Single variable font (Inter) backing every text style site-wide. */
const inter = localFont({
  src: '../assets/fonts/Inter-Variable.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Profile Web',
  description: 'My profile website',
};

interface RootLayoutProps {
  children: ReactNode;
}

/** Root shell: Nextra docs chrome (navbar, sidebar, footer) around each page. */
export default async function RootLayout({ children }: RootLayoutProps) {
  const navbar = (
    <Navbar logo={<b>Profile Web</b>}>
      <ThemeSwitch />
    </Navbar>
  );
  const pageMap = await getPageMap();

  return (
    // suppressHydrationWarning: next-themes toggles the `dark` class post-hydration.
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={inter.variable}
    >
      <Head />
      <body className="font-sans">
        <Layout navbar={navbar} pageMap={pageMap} darkMode>
          {children}
        </Layout>
      </body>
    </html>
  );
}
