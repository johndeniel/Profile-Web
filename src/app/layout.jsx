import { Layout, Navbar } from 'nextra-theme-docs';
import { ThemeSwitch } from '@/components/theme-switch';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import localFont from 'next/font/local';
import 'nextra-theme-docs/style.css';
import '../styles/globals.css';

const lora = localFont({
  src: '../assets/fonts/Lora-Regular.woff2',
  variable: '--font-cal-sans',
  weight: '400',
});

const geist = localFont({
  src: '../assets/fonts/Geist-Regular.woff2',
  variable: '--font-geist',
  weight: '400',
});

const geistMono = localFont({
  src: '../assets/fonts/GeistMono-Regular.woff2',
  variable: '--font-geist-mono',
  weight: '400',
});

export const metadata = {
  title: 'Profile Web',
  description: 'My profile website',
};

export default async function RootLayout({ children }) {
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
      <body className="font-geist">
        <div className="mx-auto max-w-screen-2xl">
          <Layout navbar={navbar} pageMap={pageMap} darkMode={true}>
            {children}
          </Layout>
        </div>
      </body>
    </html>
  );
}
