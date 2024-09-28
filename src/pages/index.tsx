import type { ReactElement } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';

import { getAllPosts } from 'lib/api/post';
import type { NextPageWithLayout } from 'types/page';
import type { Post } from 'types/post';

import Layout from '@/components/Layout';
import PostItem from '@/components/PostItem';

type Props = {
  postList: Omit<Post, 'content'>[];
};

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  & > div + div {
    margin-top: 2rem;
  }
`;

const IndexPage: NextPageWithLayout<Props> = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
    <div>
      <Head>
        <title>StyleList94</title>
      </Head>

      <PostList>
        {postList.map((post) => (
          <PostItem
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
          />
        ))}
      </PostList>
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
