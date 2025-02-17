'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import throttle from 'lodash/throttle';

import { cn } from '@/lib/utils';

import type { TableOfContents } from '@/types/post';

type Props = {
  items: TableOfContents[];
};

const PostTableOfContents = ({ items }: Props) => {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const HEADING_POSITION_OFFSET = 72;

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

    window.addEventListener('scroll', throttle(handleScroll, 100));
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  return (
    <div
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
              {item.content}
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
                    {childItem.content}
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
