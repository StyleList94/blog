import React from 'react';
import { ThemeProvider } from 'next-themes';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class">{children}</ThemeProvider>
);

export default AppProvider;
