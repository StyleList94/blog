import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';

import { getAllPosts } from 'lib/api/post';
import { Post } from 'types/post';

import Header from '@/components/Header';
import MainSection from '@/components/MainSection';
import Footer from '@/components/Footer';
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

const IndexPage: NextPage<Props> = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>StyleList94</title>
      </Head>

      <Header />

      <MainSection>
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
      </MainSection>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const postList: Omit<Post, 'content'>[] = getAllPosts();

  return {
    props: { postList },
  };
};

export default IndexPage;
