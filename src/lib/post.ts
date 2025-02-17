import GithubSlugger from 'github-slugger';

import type { TableOfContents } from '@/types/post';

export const postList = [
  { slug: 'setting-next-app', date: '2022-03-01T11:21:00.000Z' },
  { slug: 'revival-project-prologue', date: '2024-09-27T14:25:00.000Z' },
  { slug: 'revival-project-01', date: '2024-10-01T14:25:00.000Z' },
  { slug: 'revival-project-02', date: '2024-10-05T15:40:00.000Z' },
  { slug: 'revival-project-03', date: '2024-10-11T15:11:00.000Z' },
  { slug: 'revival-project-04', date: '2024-10-20T05:30:00.000Z' },
  { slug: 'revival-project-epilogue', date: '2024-10-22T13:08:00.000Z' },
  { slug: 'nextjs-15-changelog', date: '2024-11-14T11:45:00.000Z' },
  { slug: 'review-2024', date: '2024-12-31T12:18:00.000Z' },
];

export const generateTOC = (postContent: string): TableOfContents[] => {
  const matches = postContent.matchAll(/^(?<level>#{2,3})\s+(?<content>.+)$/gm);

  const headingList = Array.from(matches);

  const slugger = new GithubSlugger();

  return headingList.reduce<TableOfContents[]>(
    (previousValue, currentValue) => {
      const nextPrevItem = [...previousValue];
      const { level: headingLevel, content } = currentValue.groups ?? {
        level: '',
        content: '',
      };

      const tocItem: TableOfContents = {
        content,
        slug: slugger.slug(content),
        children: [],
      };

      const level = headingLevel.length - 1;

      const lastTocItemIndex = nextPrevItem.length - 1;

      if (lastTocItemIndex >= 0 && level === 2) {
        nextPrevItem[lastTocItemIndex].children.push(tocItem);
      }

      if (level === 1) {
        nextPrevItem.push(tocItem);
      }

      return nextPrevItem;
    },
    [],
  );
};
