import { Suspense } from 'react';

import { Footer as FooterContainer } from '@stylelist94/nine-beauty-actress';

import BrandLink, { DefaultBrandLink } from '../brand-link';
import ThemeControlSwitch from '../theme-control-switch';

const Footer = () => (
  <FooterContainer className="max-w-160!">
    <div className="flex justify-end items-center h-9">
      <Suspense fallback={null}>
        <ThemeControlSwitch />
      </Suspense>
    </div>
    <div className="flex justify-between items-center gap-4">
      <Suspense fallback={<DefaultBrandLink />}>
        <BrandLink />
      </Suspense>
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
