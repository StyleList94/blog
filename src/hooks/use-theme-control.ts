import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function useThemeControl() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const isDarkTheme = resolvedTheme === 'dark';

  const toggleTheme = () => {
    const targetTheme = systemTheme === 'dark' ? 'light' : 'dark';

    setTheme(theme === 'system' ? targetTheme : 'system');
  };

  useEffect(() => {
    if (theme !== 'system' && systemTheme === resolvedTheme) {
      setTheme('system');
    }
  }, [theme, systemTheme, resolvedTheme, setTheme]);

  return { isDarkTheme, toggleTheme };
}
