import { getNewPosts } from '@/lib/services/post';

export const dynamic = 'auto';

const LATELY_POST_LIST_COUNT = 5;

export async function GET() {
  const postList = await getNewPosts({ limit: LATELY_POST_LIST_COUNT });

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Stylish.LOG</title>
    <link>https://blog.styleli.sh</link>
    <description>첫경험 위주로 끄적여봅니다.</description>
    ${postList
      .map(
        (post) => `<item>
      <title>${post.title}</title>
      <link>https://blog.styleli.sh/post/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${post.date}</pubDate>
    </item>`,
      )
      .join('\n    ')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
