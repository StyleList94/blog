import React from 'react';

import Footer from './Footer';
import Header from './Header';
import MainSection from './MainSection';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
    <>
      <Header />
      <MainSection>{children}</MainSection>
      <Footer />
    </>
  );

export default Layout;
