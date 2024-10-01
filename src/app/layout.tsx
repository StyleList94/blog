import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import AppProvider from '@/components/providers';

import '@/styles/global.css';

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
    <html lang="ko">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
