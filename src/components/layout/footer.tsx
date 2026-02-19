import { Footer as FooterContainer } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

import ThemeControlSwitch from '../theme-control-switch';

const Footer = () => (
  <FooterContainer className={cn('max-w-160!', 'lg:max-w-240!')}>
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/StyleList94/blog/tree/main/posts"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'text-2xl text-zinc-800/80',
            'dark:text-zinc-200/50',
            'transition-colors duration-200 ease-in-out',
          )}
          aria-label="View post source"
        >
          <svg
            width="1em"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
          </svg>
        </a>
      </div>

      <div className="flex items-center gap-4 h-9">
        <ThemeControlSwitch />
      </div>
    </div>
    <div>
      <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
        © 2026.{' '}
        <a
          href="https://github.com/StyleList94"
          target="_blank"
          rel="noopener noreferrer"
        >
          @StyleList94
          <span className="sr-only">(새 창에서 열림)</span>
        </a>
      </p>
    </div>
  </FooterContainer>
);

export default Footer;
