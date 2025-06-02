'use server';

import fs from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

import type { Post } from '@/types/post';

const postDirectory = join(process.cwd(), 'src/posts');

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

    const { title, description, date, coverImage, ogImage } = data as Post;

    const items: Post = {
      slug: realSlug,
      title,
      description,
      date,
      coverImage,
      ogImage,
      content,
    };

    return items;
  } catch {
    const notFound: Post = {
      slug: '404',
      title: '404',
      description: '404',
      date: new Date().toISOString(),
      coverImage: '404',
      ogImage: '404',
      content: '404',
    };

    return notFound;
  }
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
