import { cn } from '@/lib/utils';

import ThemeControlButton from '@/components/theme-control-button';

const Footer = () => (
  <footer className="flex flex-col gap-6 w-full max-w-[96rem] mx-auto px-6 py-8">
    <div
      className={cn(
        'flex flex-col gap-3',
        'sm:flex-row sm:justify-between sm:gap-4',
      )}
    >
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/StyleList94/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          Github
        </a>
      </div>
      <div>
        <ThemeControlButton />
      </div>
    </div>
    <div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        © 2024.{' '}
        <a
          href="https://github.com/StyleList94"
          target="_blank"
          rel="noopener noreferrer"
        >
          StyleList94
        </a>{' '}
        All rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;
