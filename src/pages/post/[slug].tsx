import type { ReactElement } from 'react';
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';

import { getAllPosts, getPostBySlug } from 'lib/api/post';
import type { NextPageWithLayout } from 'types/page';
import type { Post } from 'types/post';

import Layout from '@/components/Layout';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';

type Props = {
  post: Omit<Post, 'slug'>;
};

const PostPage: NextPageWithLayout<Props> = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title} :: StyleList94</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="website" />
      </Head>

      <PostHeader title={post.title} date={post.date} />
      <PostBody content={post.content} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = (context) => {
  const post: Post = getPostBySlug(context?.params?.slug as string);

  return {
    props: { post },
  };
};

PostPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export default PostPage;
