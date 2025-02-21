import { getAllPosts } from '@/lib/services/api/post';

import type { Post } from '@/types/post';

export const dynamic = 'auto';

const LATELY_POST_LIST_COUNT = 5;

export async function GET() {
  const postList: Omit<Post, 'content'>[] = await getAllPosts();

  const latelyPostList = postList.slice(0, LATELY_POST_LIST_COUNT);

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
 
<channel>
  <title>STYLISH.LOG</title>
  <link>https://blog.stylelist94.dev</link>
  <description>첫경험 위주로 끄적여봅니다.</description>
  ${latelyPostList
    .map(
      (post) => `
    <item>
        <title>${post.title}</title>
        <link>https://blog.stylelist94.dev/${post.slug}</link>
        <description>${post.description}</description>
        <pubDate>${post.date}</pubDate>
    </item>
    `,
    )
    .join('')}
</channel>
 
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
