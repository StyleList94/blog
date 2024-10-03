import type { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';
import MainContent from './main-content';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => (
  <>
    <Header />
    <MainContent>{children}</MainContent>
    <Footer />
  </>
);

export default LayoutContainer;
