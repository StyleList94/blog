import type { Post, PostList } from '@/types/post';

import matter from 'gray-matter';

import { getUpdatedDateByPost } from '@/lib/utils';

// Turbopack's glob cannot match '../' patterns, so raise the root via base
// Contents arrive as a string in Vite ('?raw') and as bytes in Turbopack (type: 'bytes')
const postFiles = import.meta.glob('./posts/*.md', {
  base: '../../../',
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string | Uint8Array>;

const decoder = new TextDecoder();

const postsBySlug = new Map(
  Object.entries(postFiles).map(([path, contents]) => [
    path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
    typeof contents === 'string' ? contents : decoder.decode(contents),
  ]),
);

export async function getPostSlugs() {
  return [...postsBySlug.keys()];
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fileContents = postsBySlug.get(realSlug);

  if (!fileContents) {
    const notFound: Post = {
      slug: '404',
      title: '404',
      description: '404',
      date: new Date().toISOString(),
      content: '404',
    };

    return notFound;
  }

  const { data, content } = matter(fileContents);

  return {
    ...(data as Omit<Post, 'slug' | 'content'>),
    slug: realSlug,
    content,
  } satisfies Post;
}

export async function getAllPosts(): Promise<PostList> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts
    .map(({ content, ...rest }) => ({ ...rest }))
    .sort((post1, post2) =>
      getUpdatedDateByPost(post1) > getUpdatedDateByPost(post2) ? -1 : 1,
    );
}

export async function getNewPosts({
  limit = 5,
}: {
  limit?: number;
} = {}): Promise<PostList> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts
    .map(({ content, ...rest }) => ({ ...rest }))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(0, limit);
}
