'use client';

import { useMounted } from '@stylelist94/nine-beauty-actress';

import useThemeControl from '@/hooks/use-theme-control';

const ResetThemeButton = () => {
  const { isSystemTheme, setSystemTheme } = useThemeControl();

  const mounted = useMounted();

  if (!mounted || isSystemTheme) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setSystemTheme();
      }}
      className="flex justify-center items-center size-7.5 rounded-sm text-2xl border border-transparent transition-colors ease-in-out duration-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 text-zinc-500/50 dark:text-zinc-400/50"
      aria-label="reset theme"
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
      >
        <path d="M12 2v2" />
        <path d="M13 8.129A4 4 0 0 1 15.873 11" />
        <path d="m19 5-1.256 1.256" />
        <path d="M20 12h2" />
        <path d="M9 8a5 5 0 1 0 7 7 7 7 0 1 1-7-7" />
      </svg>
    </button>
  );
};

export default ResetThemeButton;
