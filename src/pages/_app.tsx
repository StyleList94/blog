import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types/page';

import '@/styles/global.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
