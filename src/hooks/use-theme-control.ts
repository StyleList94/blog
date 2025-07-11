import { useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';

export default function useThemeControl() {
  const { setTheme, resolvedTheme, theme } = useTheme();

  const isDarkTheme = useMemo(() => resolvedTheme === 'dark', [resolvedTheme]);
  const isSystemTheme = useMemo(() => theme === 'system', [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const setSystemTheme = useCallback(() => {
    setTheme('system');
  }, [setTheme]);

  return { isDarkTheme, isSystemTheme, toggleTheme, setSystemTheme };
}
