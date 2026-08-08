import type { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/services/post';
import { getUpdatedDateByPost } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [latestPost] = await getAllPosts();

  return [
    {
      url: 'https://blog.styleli.sh',
      lastModified: latestPost ? getUpdatedDateByPost(latestPost) : undefined,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
