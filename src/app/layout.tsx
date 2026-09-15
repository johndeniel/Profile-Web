import { Layout, Navbar } from 'nextra-theme-docs';
import { ThemeSwitch } from '@/components/theme-switch';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import 'nextra-theme-docs/style.css';
import '../styles/globals.css';

const interTight = localFont({
  src: [
    {
      path: '../assets/fonts/InterTight-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/InterTight-Italic-Variable.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const inter = localFont({
  src: '../assets/fonts/Inter-Variable.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
});

const ibmPlexMono = localFont({
  src: [
    {
      path: '../assets/fonts/IBMPlexMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/IBMPlexMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Profile Web',
  description: 'My profile website',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navbar = (
    <Navbar logo={<b>Profile Web</b>}>
      <ThemeSwitch />
    </Navbar>
  );
  const pageMap = await getPageMap();
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${interTight.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <Head />
      <body className="font-sans">
        <div className="mx-auto max-w-screen-2xl">
          <Layout navbar={navbar} pageMap={pageMap} darkMode={true}>
            {children}
          </Layout>
        </div>
      </body>
    </html>
  );
}
