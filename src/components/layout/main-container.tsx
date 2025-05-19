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
    <div className={backdropStyle} />
    <main className={cn(mainContainerStyle, 'relative max-w-[64rem]')}>
      {children}
    </main>
  </>
);

export default MainContainer;
