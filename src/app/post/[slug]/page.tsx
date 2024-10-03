import metadataContext from '@/lib/metadata-context';
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

  const title = `${post.title} :: ${metadataContext.title}`;
  const { description } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
      />
      <PostBody content={post.content} />
    </LayoutContainer>
  );
}
