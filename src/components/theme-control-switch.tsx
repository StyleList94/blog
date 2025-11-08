'use client';

import type { SVGProps } from 'react';

import {
  ToggleGroup,
  ToggleGroupItem,
  useMounted,
} from '@stylelist94/nine-beauty-actress';

import useThemeControl from '@/hooks/use-theme-control';

const iconBaseProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} satisfies SVGProps<SVGSVGElement>;

const ThemeControlSwitch = () => {
  const mounted = useMounted();
  const { theme, setTheme } = useThemeControl();

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ToggleGroup
      type="single"
      value={theme ?? 'system'}
      onValueChange={handleThemeChange}
    >
      <ToggleGroupItem value="light">
        <svg {...iconBaseProps} aria-label="icon-light-mode">
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
      </ToggleGroupItem>
      <ToggleGroupItem value="system">
        <svg {...iconBaseProps} aria-label="icon-system">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark">
        <svg {...iconBaseProps} aria-label="icon-dark-mode">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeControlSwitch;
