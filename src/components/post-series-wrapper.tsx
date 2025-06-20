import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { PropsWithChildren } from 'react';
import type { PostSeriesInfo } from '@/types/post';

type Props = PropsWithChildren<{
  title: string;
  list: PostSeriesInfo[];
  currentOrder?: number;
}>;

type SeriesNavigatorProps = {
  item: PostSeriesInfo;
  direction?: 'prev' | 'next';
};

const SeriesNavigator = ({
  item,
  direction = 'next',
}: SeriesNavigatorProps) => (
  <div
    className={cn('flex flex-col gap-3', direction === 'next' && 'text-right')}
  >
    <p className="text-sm text-neutral-500 dark:text-neutral-400 tracking-wide">
      {direction === 'next' ? '다음' : '이전'} 시리즈 포스트
    </p>
    <Link
      href={`/post/${item.slug}`}
      className={cn(
        'font-medium',
        'border-b border-transparent',
        'hover:border-neutral-700 dark:hover:border-neutral-200',
      )}
    >
      {item.title}
    </Link>
  </div>
);

const PostSeriesWrapper = ({ title, list, currentOrder, children }: Props) => {
  const prevSeriesIndex = (currentOrder ?? -1) - 2;
  const nextSeriesIndex = (currentOrder ?? -1) % list.length;

  return (
    <>
      <div className={cn('flex flex-col gap-4 py-4')}>
        <div className={cn('flex flex-col gap-2')}>
          <p
            className={cn(
              'tracking-widest text-sm',
              'text-neutral-500 dark:text-neutral-400',
            )}
          >
            S E R I E S
          </p>
          <h2 className={cn('font-semibold text-lg')}>{title}</h2>
        </div>

        <div className={cn('flex flex-col items-start gap-1.5')}>
          {list.map((item, index) => (
            <Link
              key={`post-series-${item.slug}`}
              href={`/post/${item.slug}`}
              className={cn(
                'text-neutral-700 dark:text-neutral-200',
                'leading-normal',
                'border-b border-transparent',
                currentOrder === index + 1 && [
                  'text-neutral-900 dark:text-neutral-50 font-medium',
                  'border-neutral-700 dark:border-neutral-200',
                ],
                'hover:border-neutral-700 dark:hover:border-neutral-200',
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {children}
      <div
        className={cn(
          'flex flex-col items-start gap-4 w-full mt-8 p-4',
          'sm:flex-row sm:justify-between sm:items-center',
          '*:even:self-end *:sm:even:self-auto',
        )}
      >
        <div>
          {prevSeriesIndex >= 0 && (
            <SeriesNavigator item={list[prevSeriesIndex]} direction="prev" />
          )}
        </div>

        <div>
          {nextSeriesIndex > 0 && (
            <SeriesNavigator item={list[nextSeriesIndex]} direction="next" />
          )}
        </div>
      </div>
    </>
  );
};

export default PostSeriesWrapper;
