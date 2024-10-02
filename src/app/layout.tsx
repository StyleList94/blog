import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import AppProvider from '@/components/providers';

import '@/styles/global.css';
import { notoSerif, pretendard, robotoMono } from '@/assets/fonts';

export const metadata: Metadata = {
  title: 'StyleList94',
  description: 'Stylish Diary',
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
      className={`${pretendard.variable} ${robotoMono.variable} ${notoSerif.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
