'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

const ThemeControlButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const isDarkTheme = resolvedTheme === 'dark';

  const toggleTheme = () => {
    const targetTheme = systemTheme === 'dark' ? 'light' : 'dark';

    setTheme(theme === 'system' ? targetTheme : 'system');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className={cn(
        'outline-none border-0 bg-transparent text-xs cursor-pointer font-mono',
        'hover:underline',
      )}
      onClick={toggleTheme}
    >
      Change <strong>{isDarkTheme ? 'Light Theme' : 'Dark Theme'}</strong>
    </button>
  );
};

export default ThemeControlButton;
