import type { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/services/post';

export function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const postList = await getAllPosts();

  const start = id * 50000;
  const end = start + 50000;

  return new Promise((resolve) => {
    resolve(
      postList.slice(start, end).map((post) => ({
        url: `https://blog.styleli.sh/post/${post.slug}`,
        lastModified: new Date(post.lastModified ?? post.date),
      })),
    );
  });
}
