import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
};

const MainContent = ({ children }: Props) => (
  <>
    <div
      className={cn(
        'fixed inset-0 z-[-1]',
        'transition ease-in-out duration-200',
        'bg-white dark:bg-neutral-900',
      )}
    />
    <main
      className={cn(
        'max-w-[96rem] min-h-[calc(100vh-4rem-10rem)] mx-auto my-0 p-6 text-black dark:text-white',
        'sm:min-h-[calc(100vh-4rem-8rem)]',
      )}
    >
      {children}
    </main>
  </>
);

export default MainContent;
