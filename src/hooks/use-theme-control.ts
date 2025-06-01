import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import useMounted from '@/hooks/use-mounted';

export default function useThemeControl() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const mounted = useMounted();

  const isDarkTheme = resolvedTheme === 'dark';

  const toggleTheme = () => {
    const targetTheme = systemTheme === 'dark' ? 'light' : 'dark';

    setTheme(theme === 'system' ? targetTheme : 'system');
  };

  useEffect(() => {
    if (mounted && theme !== 'system' && systemTheme === resolvedTheme) {
      setTheme('system');
    }
  }, [mounted, theme, systemTheme, resolvedTheme, setTheme]);

  return { isDarkTheme, toggleTheme };
}
