import { Layout, Navbar } from 'nextra-theme-docs';
import { ThemeSwitch } from '@/components/theme-switch';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import 'nextra-theme-docs/style.css';
import '../styles/globals.css';

const lora = localFont({
  src: [
    {
      path: '../assets/fonts/Lora-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lora-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    { path: '../assets/fonts/Lora-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const geist = localFont({
  src: '../assets/fonts/Geist-Regular.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: '../assets/fonts/GeistMono-Regular.woff2',
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
      className={`${lora.variable} ${geist.variable} ${geistMono.variable}`}
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
