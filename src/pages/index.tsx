import type { ReactElement } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getAllPosts } from '@/lib/api/post';
import type { NextPageWithLayout } from '@/types/page';
import type { Post } from '@/types/post';

import Layout from '@/components/Layout';
import PostItem from '@/components/PostItem';

type Props = {
  postList: Omit<Post, 'content'>[];
};

const IndexPage: NextPageWithLayout<Props> = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>
    <Head>
      <title>StyleList94</title>
    </Head>

    <div className="flex flex-col justify-center items-center gap-8 p-8 ">
      {postList.map((post) => (
        <PostItem
          key={post.slug}
          slug={post.slug}
          title={post.title}
          description={post.description}
          date={post.date}
        />
      ))}
    </div>
  </div>
);

IndexPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getStaticProps: GetStaticProps<Props> = () => {
  const postList: Omit<Post, 'content'>[] = getAllPosts();

  return {
    props: { postList },
  };
};

export default IndexPage;
