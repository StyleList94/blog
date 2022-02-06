import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post } from 'types/post';

const postDirectory = join(process.cwd(), 'src/posts');

export function getPostSlugs() {
  return fs.readdirSync(postDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const path = join(postDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(path, 'utf8');

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
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
