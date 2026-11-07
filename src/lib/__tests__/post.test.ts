import { getPostBySlug, getPostSlugs } from '../services/post';

describe('post services', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns stable missing-post data independent of the current time', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const first = await getPostBySlug('__missing_post__');

    vi.setSystemTime(new Date('2026-02-01T00:00:00Z'));
    const second = await getPostBySlug('__missing_post__');

    expect(first.slug).toBe('404');
    expect(second).toEqual(first);
  });

  it('loads every discovered post rather than returning the missing-post fallback', async () => {
    const slugs = await getPostSlugs();
    expect(slugs.length).toBeGreaterThan(0);

    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
    posts.forEach((post, index) => {
      expect(post.slug).toBe(slugs[index]);
      expect(post.content.length).toBeGreaterThan(0);
    });
  });
});
