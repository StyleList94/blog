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
        'bg-white dark:bg-gray-900',
      )}
    />
    <main className="max-w-[1440px] mx-auto my-0 p-6 text-gray-950 dark:text-white">
      {children}
    </main>
  </>
);

export default MainContent;
