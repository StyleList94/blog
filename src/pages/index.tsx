import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>StyleList94</title>
        <meta name="description" content="Stylish Diary" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <span>StyleList94</span>
      </main>
    </div>
  );
};

export default Home;
