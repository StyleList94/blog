import type { ReactNode } from 'react';

import MainContainer from './main-container';
import Footer from './footer';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => (
  <div className="flex flex-col min-h-dvh">
    <MainContainer>{children}</MainContainer>
    <Footer />
  </div>
);

export default LayoutContainer;
