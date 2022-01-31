import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postDirectory = join(process.cwd(), 'src/posts');

export function getPostSlugs() {
  return fs.readdirSync(postDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const path = join(postDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(path, 'utf8');

  const { data, content } = matter(fileContents);

  return { slug: realSlug, data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));
  return posts;
}
