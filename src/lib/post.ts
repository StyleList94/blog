import GithubSlugger from 'github-slugger';

import type { TableOfContents } from '@/types/post';

// eslint-disable-next-line import/prefer-default-export
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
