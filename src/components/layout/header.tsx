import Link from 'next/link';
import { Header as HeaderContainer } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

const Header = () => {
  const isHangulDay = new Date().getMonth() === 9 && new Date().getDate() === 9;

  return (
    <HeaderContainer
      wrapperStyle={cn(
        'backdrop-blur-2xl',
        'mask-[linear-gradient(to_bottom,black_75%,transparent_105%)]',
        'will-change-transform',
        'transition-colors ease-in-out duration-200',
      )}
      boxStyle={cn('sm:max-w-160', 'lg:max-w-240')}
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
            className="flex items-baseline font-display text-xl"
          >
            stylish<span className="text-lg">.log</span>
          </Link>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
