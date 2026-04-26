import type { ReactNode } from 'react';

import MainContainer from './main-container';
import Footer from './footer';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => (
  <>
    <MainContainer>{children}</MainContainer>
    <Footer />
  </>
);

export default LayoutContainer;
