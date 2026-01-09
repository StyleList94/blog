import type { Post, PostList } from '@/types/post';

import { join } from 'node:path';
import fs from 'node:fs/promises';

import matter from 'gray-matter';

import { getUpdatedDateByPost } from '@/lib/utils';

type RequestPostsByPageParams = {
  page?: string | string[];
  limit?: number;
};

type ResponsePostsByPageData = {
  total: number;
  lastPage: number;
  postList: PostList;
};

const postDirectory = join(process.cwd(), 'posts');

export async function getPostSlugs() {
  const list = await fs.readdir(postDirectory);
  return list.filter((filename) => filename.endsWith('.md'));
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const path = join(postDirectory, `${realSlug}.md`);
  try {
    const fileContents = await fs.readFile(path, 'utf8');

    const { data, content } = matter(fileContents);

    const { ...rest } = data as Omit<Post, 'slug' | 'content'>;

    const items: Post = {
      slug: realSlug,
      content,
      ...rest,
    };

    return items;
  } catch {
    const notFound: Post = {
      slug: '404',
      title: '404',
      description: '404',
      date: new Date().toISOString(),
      content: '404',
    };

    return notFound;
  }
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

export async function getPostsByPage({
  page = '1',
  limit = 5,
}: RequestPostsByPageParams): Promise<ResponsePostsByPageData> {
  if (typeof page !== 'string') {
    throw new TypeError('page is not array parameter');
  }

  if (!/^\d+$/.test(page)) {
    throw new TypeError('page must be a number');
  }

  if (!+page) {
    throw new RangeError('page must be greater than 0');
  }

  const allPosts = await getAllPosts();

  const startIndex = (+page - 1) * limit;
  const total = allPosts.length;

  return {
    total,
    lastPage: Math.ceil(total / limit),
    postList: allPosts.slice(startIndex, startIndex + limit),
  };
}
