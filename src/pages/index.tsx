import type { NextPage } from 'next';
import Head from 'next/head';

import Header from 'components/Header';
import MainSection from 'components/MainSection';
import Footer from 'components/Footer';

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>StyleList94</title>
      </Head>

      <Header />

      <MainSection>content</MainSection>

      <Footer />
    </div>
  );
};

export default IndexPage;
