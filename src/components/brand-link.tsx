'use client';

import { use, useState } from 'react';
import { browser } from 'react-dom';
import Link from 'next/link';

import { isHangulDay } from '@/lib/utils';

export const DefaultBrandLink = () => (
  <Link href="/" className="flex items-baseline font-display text-base w-fit">
    stylish<span className="text-sm">.log</span>
  </Link>
);

const BrandLink = () => {
  use(browser());
  const [isSeasonal] = useState(() => isHangulDay(new Date()));

  if (!isSeasonal) return <DefaultBrandLink />;

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

export default BrandLink;
