import type { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';
import BodyContainer from './body-container';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => (
  <>
    <Header />
    <BodyContainer>{children}</BodyContainer>
    <Footer />
  </>
);

export default LayoutContainer;
