import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import { comfortaa, notoSerif, pretendard, robotoMono } from '@/assets/fonts';
import { metadataContext } from '@/lib/metadata';

import AppProvider from '@/providers/app-provider';

import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.styleli.sh'),
  title: metadataContext.title,
  description: metadataContext.description,
  keywords: ['블로그', 'Blog', '기술 블로그', 'Tech Blog'],
  openGraph: {
    title: metadataContext.title,
    description: metadataContext.description,
    type: 'website',
    siteName: metadataContext.siteName,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: metadataContext.title,
    description: metadataContext.description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${robotoMono.variable} ${notoSerif.variable} ${comfortaa.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
