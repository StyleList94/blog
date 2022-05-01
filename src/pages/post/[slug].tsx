import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';

import { getAllPosts, getPostBySlug } from 'lib/api/post';
import type { Post } from 'types/post';

import Header from '@/components/Header';
import MainSection from '@/components/MainSection';
import PostBody from '@/components/PostBody';
import Footer from '@/components/Footer';
import PostHeader from '@/components/PostHeader';

type Props = {
  post: Omit<Post, 'slug'>;
};

const PostPage: NextPage<Props> = ({
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
      <Header />

      <MainSection>
        <PostHeader title={post.title} date={post.date} />
        <PostBody content={post.content} />
      </MainSection>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = (context) => {
  const post: Post = getPostBySlug(context?.params?.slug as string);

  return {
    props: { post },
  };
};

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
