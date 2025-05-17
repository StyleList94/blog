import {
  notoSerif,
  pretendard,
  robotoMono,
  titilliumWeb,
} from '@/assets/fonts';
import { metadataContext } from '@/lib/metadata';

import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import AppProvider from '@/providers/app-provider';
import RouteProgressBar from '@/components/route-progress-bar';

import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.stylelist94.dev'),
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
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${robotoMono.variable} ${notoSerif.variable} ${titilliumWeb.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProvider>{children}</AppProvider>
        <RouteProgressBar />
      </body>
    </html>
  );
}
