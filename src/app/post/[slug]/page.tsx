import { getAllPosts, getPostBySlug } from '@/lib/services/api/post';

import type { Metadata } from 'next';
import type { Post } from '@/types/post';

import LayoutContainer from '@/components/layout-container';
import PostHeader from '@/components/post-header';
import PostBody from '@/components/post-body';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: Post = getPostBySlug(params.slug);

  const title = `${post.title} :: StyleList94`;
  const { description } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostContentPage({ params }: Props) {
  const post: Post = getPostBySlug(params.slug);

  return (
    <LayoutContainer>
      <PostHeader title={post.title} date={post.date} />
      <PostBody content={post.content} />
    </LayoutContainer>
  );
}
