import Footer from 'components/Footer';
import Header from 'components/Header';
import MainSection from 'components/MainSection';
import type { NextPage } from 'next';
import Head from 'next/head';

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>StyleList94</title>
      </Head>

      <Header />

      <MainSection>Content</MainSection>

      <Footer />
    </div>
  );
};

export default IndexPage;
