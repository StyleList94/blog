import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

import styles from '@/styles/index';
import type { NextPageWithLayout } from 'types/page';

import ThemeProvider from '@/contexts/ThemeContext';
import RouteProgress from '@/components/RouteProgress';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <RouteProgress />
      <Global styles={styles} />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
