import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

import styles from '@/styles/index';

import ThemeProvider from 'contexts/ThemeContext';
import RouteProgress from '@/components/RouteProgress';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <RouteProgress />
      <Global styles={styles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
