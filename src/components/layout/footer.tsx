import { Suspense } from 'react';
import Link from 'next/link';
import { io } from 'next/cache';
import { Footer as FooterContainer } from '@stylelist94/nine-beauty-actress';

import { isHangulDay } from '@/lib/utils';

import ThemeControlSwitch from '../theme-control-switch';

const BrandLink = () => (
  <Link href="/" className="flex items-baseline font-display text-base w-fit">
    stylish<span className="text-sm">.log</span>
  </Link>
);

export const SeasonalBrandLink = async () => {
  await io();

  if (!isHangulDay(new Date())) return <BrandLink />;

  return (
    <Link
      href="/"
      className="flex items-end gap-0.5 font-sans text-base tracking-wide w-fit"
    >
      맵시
      <span className="text-sm leading-relaxed tracking-wider">.일기</span>
    </Link>
  );
};

const Footer = () => (
  <FooterContainer className="max-w-160!">
    <div className="flex justify-end items-center h-9">
      <ThemeControlSwitch />
    </div>
    <div className="flex justify-between items-center gap-4">
      <Suspense fallback={<BrandLink />}>
        <SeasonalBrandLink />
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
