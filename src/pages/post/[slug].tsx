import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next';

import { getAllPosts, getPostBySlug } from 'lib/api/post';
import { Post } from 'types/post';

import Header from 'components/Header';
import MainSection from 'components/MainSection';
import PostBody from 'components/PostBody';
import Footer from 'components/Footer';

type Props = {
  post: Omit<Post, 'slug'>;
};

const PostPage: NextPage<Props> = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Header />

      <MainSection>
        <PostBody content={post.content} />
      </MainSection>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = (context) => {
  const { data, content } = getPostBySlug(context?.params?.slug as string);

  const post: Omit<Post, 'slug'> = { data, content };

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
