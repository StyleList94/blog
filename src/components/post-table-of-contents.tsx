'use client';

import type { TableOfContents } from '@/types/post';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import throttle from 'lodash-es/throttle';
import { useMounted } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

type Props = {
  items: TableOfContents[];
};

const PostTableOfContents = ({ items }: Props) => {
  const mounted = useMounted();
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) {
      return () => {};
    }

    const HEADER_HEIGHT = 56;
    const HEADING_POSITION_OFFSET = HEADER_HEIGHT + 40;

    const resultHeadingPosition = items
      .flatMap((item) => [item, ...item.children])
      .map((heading) => {
        const scrollTop = window.scrollY;
        const headingElement = document.querySelector(`#${heading.slug}`);

        const topPosition = headingElement
          ? headingElement.getBoundingClientRect().top + scrollTop
          : 0;

        return { slug: heading.slug, top: topPosition };
      })
      .reverse();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const currentHeading = resultHeadingPosition.find(
        (headingPos) => headingPos.top - HEADING_POSITION_OFFSET <= scrollTop,
      );

      setActiveHeading(currentHeading?.slug ?? null);
    };

    handleScroll();

    const throttledScroll = throttle(handleScroll, 100);

    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      throttledScroll.cancel();
    };
  }, [items, mounted]);

  return (
    <div
      key={`toc-${mounted.toString()}`}
      className={cn(
        'border-l px-3 border-neutral-600/20',
        'dark:border-neutral-400/30',
      )}
    >
      <ul
        aria-label="toc-level-1"
        className={cn('text-sm text-neutral-400', 'dark:text-neutral-500')}
      >
        {items.map((item) => (
          <li key={`table-of-contents-level-1-${item.slug}`} className="m-1.5">
            <Link
              href={`#${item.slug}`}
              className={cn(
                'transition-all',
                activeHeading === item.slug &&
                  'text-neutral-800 dark:text-neutral-200 scale-105',
              )}
            >
              {item.content.replace(/`/g, '')}
            </Link>

            <ul aria-label="toc-level-2" className="pl-2">
              {item.children.map((childItem) => (
                <li
                  key={`table-of-contents-level-2-${childItem.slug}`}
                  className="m-1.5"
                >
                  <Link
                    href={`#${childItem.slug}`}
                    className={cn(
                      'transition-all',
                      activeHeading === childItem.slug &&
                        'text-neutral-800 dark:text-neutral-200 scale-105',
                    )}
                  >
                    {childItem.content.replace(/`/g, '')}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostTableOfContents;
