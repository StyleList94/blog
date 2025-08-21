import type { PropsWithChildren } from 'react';

import Link, { type LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

type Props = {
  currentPage?: number;
};

type PageButtonProps = PropsWithChildren<
  LinkProps<'/'> & { isActive?: boolean }
>;

const PageButton = ({ children, isActive, ...props }: PageButtonProps) => (
  <Link
    className={cn(
      'transition-colors ease-in-out duration-200',
      'flex justify-center items-center size-9 p-1',
      'rounded-md',
      'text-zinc-400 dark:text-zinc-500',
      isActive && 'text-zinc-950 dark:text-zinc-50',
      'hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80',
      'cursor-pointer',
      'select-none',
    )}
    {...props}
  >
    {children}
  </Link>
);

const Pagination = ({ currentPage = 1 }: Props) => (
  <div className="flex items-center">
    <div className="flex items-center gap-1">
      {'LOVE'.split('').map((page, index) => {
        const pageNumber = index + 1;
        return (
          <PageButton
            isActive={pageNumber === currentPage}
            key={`page-${page}`}
            href={index ? `/?page=${pageNumber}` : '/'}
          >
            {page}
          </PageButton>
        );
      })}
    </div>
  </div>
);

export default Pagination;
