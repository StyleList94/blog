import { type ReactNode } from 'react';
import { MainContainer as MainContainerBase } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => (
  <MainContainerBase
    className={cn(
      'relative flex flex-col w-full max-w-160',
      'transition-colors ease-in-out duration-200',
      'lg:max-w-240',
    )}
    backdropClassName="transition-colors ease-in-out duration-200"
  >
    {children}
  </MainContainerBase>
);

export default MainContainer;
