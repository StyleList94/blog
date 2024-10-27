import { redirect } from 'next/navigation';
import { BlogPosting, WithContext } from 'schema-dts';

import { metadataContext } from '@/lib/metadata';
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
  const post: Post = await getPostBySlug(params.slug);

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
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostContentPage({ params }: Props) {
  const post: Post = await getPostBySlug(params.slug);

  if (post.slug === '404') {
    redirect(`/404`);
  }

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    dateCreated: post.date,
    description: post.description,
  };

  return (
    <LayoutContainer>
      <script
        type="application/ld+json"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
      />
      <PostBody content={post.content} />
    </LayoutContainer>
  );
}
