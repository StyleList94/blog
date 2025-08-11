import Link from 'next/link';
import {
  headerContainerStyle,
  headerContentBoxStyle,
} from '@stylelist94/nine-beauty-actress/styles';

import { cn } from '@/lib/utils';

import ThemeControlSwitch from '@/components/theme-control-switch';

const Header = () => {
  const isHangulDay = new Date().getMonth() === 9 && new Date().getDate() === 9;

  return (
    <>
      <header
        className={cn(
          headerContainerStyle,
          'transition-colors ease-in-out duration-200',
        )}
      >
        <div
          className={cn(headerContentBoxStyle, 'sm:max-w-160', 'lg:max-w-240')}
        >
          <div className="flex justify-between w-full select-none">
            {isHangulDay ? (
              <Link
                href="/"
                className="flex items-end gap-0.5 font-sans text-xl tracking-wide"
              >
                맵시
                <span className="text-sm leading-relaxed tracking-wider">
                  .일기
                </span>
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-end gap-0.5 font-display text-xl tracking-wide"
              >
                Stylish
                <span className="text-sm leading-relaxed tracking-wider">
                  .LOG
                </span>
              </Link>
            )}
          </div>

          <ThemeControlSwitch />
        </div>
      </header>
      <div className="mt-14" />
    </>
  );
};

export default Header;
