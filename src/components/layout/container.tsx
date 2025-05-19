import type { ReactNode } from 'react';

import Header from './header';
import MainContainer from './main-container';
import Footer from './footer';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => (
  <>
    <Header />
    <MainContainer>{children}</MainContainer>
    <Footer />
  </>
);

export default LayoutContainer;
