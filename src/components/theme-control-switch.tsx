'use client';

import { Switch, useMounted } from '@stylelist94/nine-beauty-actress';

import useThemeControl from '@/hooks/use-theme-control';

const ThemeControlSwitch = () => {
  const mounted = useMounted();

  const { isDarkTheme, toggleTheme } = useThemeControl();

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      isChecked={isDarkTheme}
      onCheckedChange={toggleTheme}
      iconClassName="text-zinc-500/80 dark:text-zinc-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-light-mode"
      >
        <circle cx={12} cy={12} r={4} />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-dark-mode"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </Switch>
  );
};

export default ThemeControlSwitch;
