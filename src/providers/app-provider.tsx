import type { ReactNode } from 'react';

import { ThemeProvider } from 'next-themes';

const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class">{children}</ThemeProvider>
);

export default AppProvider;
