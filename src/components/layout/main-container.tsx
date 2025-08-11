import { type ReactNode } from 'react';
import {
  backdropStyle,
  mainContainerStyle,
} from '@stylelist94/nine-beauty-actress/styles';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => (
  <>
    <div
      className={cn(
        backdropStyle,
        'transition-colors ease-in-out duration-200',
      )}
    />
    <main
      className={cn(
        mainContainerStyle,
        'relative flex flex-col w-full max-w-160',
        'transition-colors ease-in-out duration-200',
        'lg:max-w-240',
      )}
    >
      {children}
    </main>
  </>
);

export default MainContainer;
