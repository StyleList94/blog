import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

import styles from 'styles';

import ThemeProvider from 'components/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Global styles={styles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
