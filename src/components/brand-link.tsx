'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { isHangulDay } from '@/lib/utils';

// Read the clock after hydration so pages embedding the footer stay static
const BrandLink = () => {
  const [isSeasonal, setIsSeasonal] = useState(false);

  useEffect(() => {
    setIsSeasonal(isHangulDay(new Date()));
  }, []);

  if (!isSeasonal)
    return (
      <Link
        href="/"
        className="flex items-baseline font-display text-base w-fit"
      >
        stylish<span className="text-sm">.log</span>
      </Link>
    );

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
