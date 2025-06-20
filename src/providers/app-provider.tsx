import { ThemeProvider } from 'next-themes';

import type { ReactNode } from 'react';

const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class">{children}</ThemeProvider>
);

export default AppProvider;
