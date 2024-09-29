import Link from 'next/link';

import { cn } from '@/lib/utils';

const Header = () => (
  <>
    <header
      className={cn(
        'fixed top-0 left-0 flex justify-center items-center w-full h-24 px-8 py-4',
        'border-b border-b-gray-200/80 dark:border-b-gray-700/80',
        'transition ease-in-out duration-200',
        'bg-white dark:bg-gray-900',
      )}
    >
      <div className="flex flex-col justify-center items-center leading-tight">
        <Link href="/" passHref>
          <span className="text-2xl">StyleList94</span>
        </Link>
        <span className="text-sm">Stylish Diary</span>
      </div>
    </header>
    <div className="h-24" />
  </>
);

export default Header;
