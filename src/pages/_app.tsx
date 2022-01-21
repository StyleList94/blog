import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

import styles from 'styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={styles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
