import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/services/api/post';

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const start = id * 50000;
  const end = start + 50000;

  const posts = getAllPosts();

  return new Promise((resolve) => {
    resolve(
      posts.slice(start, end).map((post) => ({
        url: `https://blog.stylelist94.dev/post/${post.slug}`,
        lastModified: post.date,
      })),
    );
  });
}
