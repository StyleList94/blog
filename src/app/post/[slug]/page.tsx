import type { Metadata, Route } from 'next';
import type { Post, PostSeriesInfo } from '@/types/post';

import { redirect } from 'next/navigation';
import { BlogPosting, WithContext } from 'schema-dts';

import { metadataContext } from '@/lib/metadata';
import { getAllPosts, getPostBySlug } from '@/lib/services/post';
import { generateSeries, generateTOC } from '@/lib/post-utils';
import { calculateReadingTime } from '@/lib/utils';

import PostHeader from '@/components/post-header';
import PostBody from '@/components/post-body';
import PostTableOfContents from '@/components/post-table-of-contents';
import PostSeriesWrapper from '@/components/post-series-wrapper';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: Post = await getPostBySlug(slug);

  const title = `${post.title} :: ${metadataContext.title}`;
  const { description } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/post/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostContentPage({ params }: Props) {
  const { slug } = await params;
  const post: Post = await getPostBySlug(slug);

  if (post.slug === '404') redirect('/not-found' as Route<'/not-found'>);

  let seriesList: PostSeriesInfo[] = [];

  if (post.series) {
    const postList = await getAllPosts();
    seriesList = generateSeries(postList, post.series);
  }

  const tocList = generateTOC(post.content);
  const readingTimeMinutes = calculateReadingTime(post.content);

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    dateCreated: post.date,
    datePublished: post.date,
    dateModified: post.lastModified,
    description: post.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="flex flex-col w-full">
        <PostHeader
          title={post.title}
          description={post.description}
          date={post.date}
          lastModified={post.lastModified}
          readingTimeMinutes={readingTimeMinutes}
        />
        {post.series && seriesList.length > 0 ? (
          <PostSeriesWrapper
            title={post.series}
            list={seriesList}
            currentOrder={post.seriesOrder}
          >
            <PostBody content={post.content} />
          </PostSeriesWrapper>
        ) : (
          <PostBody content={post.content} />
        )}
      </div>
      <aside className="hidden xl:block fixed top-16 left-[calc(50%+20rem)] w-60 max-h-[calc(100vh-8rem)] overflow-auto">
        <PostTableOfContents items={tocList} />
      </aside>
    </>
  );
}
