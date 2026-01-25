'use client';

import type { TableOfContents } from '@/types/post';

import { memo, useEffect, useState } from 'react';
import throttle from 'lodash-es/throttle';
import { useMounted } from '@stylelist94/nine-beauty-actress';
import { clsx } from 'clsx';

type Props = {
  items: TableOfContents[];
};

type TableOfContentProps = {
  item: TableOfContents;
  isActive: boolean;
  level: 1 | 2;
};

const TableOfContent = memo<TableOfContentProps>(
  ({ item, isActive, level }) => (
    <li key={`table-of-contents-level-${level}-${item.slug}`} className="m-1.5">
      <a
        href={`#${item.slug}`}
        className={clsx(
          'transition',
          isActive && 'text-neutral-800 dark:text-neutral-200',
        )}
      >
        {item.content.replace(/`/g, '')}
      </a>
    </li>
  ),
);

TableOfContent.displayName = 'TableOfContent';

const HEADER_HEIGHT = 56;
const HEADING_POSITION_OFFSET = HEADER_HEIGHT + 40;
const BOTTOM_THRESHOLD = 50;

const PostTableOfContents = ({ items }: Props) => {
  const mounted = useMounted();
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) {
      return () => {};
    }

    const allHeadings = items.flatMap((item) => [item, ...item.children]);

    const resultHeadingPosition = allHeadings
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

      const isAtBottom =
        window.innerHeight + scrollTop >=
        document.documentElement.scrollHeight - BOTTOM_THRESHOLD;

      if (isAtBottom && allHeadings.length > 0) {
        setActiveHeading(allHeadings[allHeadings.length - 1].slug);
        return;
      }

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
    <div key={`toc-${mounted.toString()}`} className="px-3">
      <ul
        aria-label="toc-level-1"
        className="text-sm text-neutral-400 dark:text-neutral-500"
      >
        {items.map((item) => (
          <li key={`parent-${item.slug}`} className="m-1.5">
            <a
              href={`#${item.slug}`}
              className={clsx(
                'transition',
                activeHeading === item.slug &&
                  'text-neutral-800 dark:text-neutral-200',
              )}
            >
              {item.content.replace(/`/g, '')}
            </a>

            {item.children.length > 0 && (
              <ul aria-label="toc-level-2" className="pl-2">
                {item.children.map((childItem) => (
                  <TableOfContent
                    key={childItem.slug}
                    item={childItem}
                    isActive={activeHeading === childItem.slug}
                    level={2}
                  />
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(PostTableOfContents);
