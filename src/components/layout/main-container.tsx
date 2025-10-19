import { type ReactNode } from 'react';
import {
  backdrop,
  mainContainer,
} from '@stylelist94/nine-beauty-actress/styles';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => (
  <>
    <div
      className={cn(backdrop, 'transition-colors ease-in-out duration-200')}
    />
    <main
      className={cn(
        mainContainer,
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
