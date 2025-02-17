import Link from 'next/link';

import { cn } from '@/lib/utils';
import ThemeControlSwitch from '@/components/theme-control-switch';

const Header = () => {
  const isHangulDay = new Date().getMonth() === 9 && new Date().getDate() === 9;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 flex w-full h-16 z-10',
          'border-b border-b-gray-200/80 dark:border-b-gray-700/80',
          'bg-white dark:bg-neutral-900',
          'transition ease-in-out duration-200',
        )}
      >
        <div
          className={cn(
            'flex items-center w-full 2xl:max-w-[96rem] px-6 py-4 mx-auto',
          )}
        >
          <div className="flex justify-between w-full select-none">
            {isHangulDay ? (
              <Link
                href="/"
                className="flex items-end gap-0.5 font-sans text-xl tracking-wide"
              >
                스타일리시
                <span className="text-sm leading-relaxed tracking-wider">
                  .로그
                </span>
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-end gap-0.5 font-display text-xl tracking-wide"
              >
                STYLISH
                <span className="text-sm leading-relaxed tracking-wider">
                  .LOG
                </span>
              </Link>
            )}
          </div>

          <ThemeControlSwitch />
        </div>
      </header>
      <div className="h-16" />
    </>
  );
};

export default Header;
