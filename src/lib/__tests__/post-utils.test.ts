import { Post } from '@/types/post';

import { generateTOC, generateSeries, groupPostsByYear } from '../post-utils';

const mockContent = `
## Cocktail

###  Martini

### Long Island Iced Tea

## 칵테일

### 도화

### 스크류 드라이버

### 피나 콜라다
`;

const mockPostMetaList = [
  {
    slug: 'my-crush',
    title: '오늘의 일기',
    description: '누군가를 좋아하고 있다',
    date: '2025-07-10T14:50:00.000Z',
  },
  {
    slug: 'cocktail-life-02',
    title: '칵테일 어디까지 마셔봤니? 쇼트 드링크 편',
    description: '칵테일 탐구생활 2편',
    date: '2024-09-20T14:50:00.000Z',
    series: '칵테일 탐구생활',
    seriesOrder: 2,
  },
  {
    slug: 'cocktail-life-01',
    title: '칵테일 어디까지 마셔봤니? 롱 드링크 편',
    description: '칵테일 탐구생활 1편',
    date: '2024-03-05T14:50:00.000Z',
    series: '칵테일 탐구생활',
    seriesOrder: 1,
  },
];

describe('genetateTOC', () => {
  it('should return an array of TOC', () => {
    const tocList = generateTOC(mockContent);

    expect(tocList).toEqual([
      {
        content: 'Cocktail',
        slug: 'cocktail',
        children: [
          {
            content: 'Martini',
            slug: 'martini',
            children: [],
          },
          {
            content: 'Long Island Iced Tea',
            slug: 'long-island-iced-tea',
            children: [],
          },
        ],
      },
      {
        content: '칵테일',
        slug: '칵테일',
        children: [
          {
            content: '도화',
            slug: '도화',
            children: [],
          },
          {
            content: '스크류 드라이버',
            slug: '스크류-드라이버',
            children: [],
          },
          {
            content: '피나 콜라다',
            slug: '피나-콜라다',
            children: [],
          },
        ],
      },
    ]);
  });
});

describe('generateSeries()', () => {
  it('should return an array of series', () => {
    const seriesList = generateSeries(
      mockPostMetaList as Post[],
      '칵테일 탐구생활',
    );

    expect(seriesList).toEqual([
      {
        slug: 'cocktail-life-01',
        title: '칵테일 어디까지 마셔봤니? 롱 드링크 편',
      },
      {
        slug: 'cocktail-life-02',
        title: '칵테일 어디까지 마셔봤니? 쇼트 드링크 편',
      },
    ]);
  });
});

describe('groupPostsByYear()', () => {
  it('should group posts by year preserving input order', () => {
    const groups = groupPostsByYear(mockPostMetaList);

    expect(groups).toEqual([
      {
        year: 2025,
        posts: [mockPostMetaList[0]],
      },
      {
        year: 2024,
        posts: [mockPostMetaList[1], mockPostMetaList[2]],
      },
    ]);
  });

  it('should use lastModified year when present', () => {
    const editedPost = {
      slug: 'love-letter',
      title: '마음만큼이나',
      description: '육체의 대화도 중요하지',
      date: '2023-12-30T00:00:00.000Z',
      lastModified: '2025-01-05T00:00:00.000Z',
    };

    const groups = groupPostsByYear([editedPost]);

    expect(groups).toEqual([
      {
        year: 2025,
        posts: [editedPost],
      },
    ]);
  });

  it('should return an empty array for empty input', () => {
    expect(groupPostsByYear([])).toEqual([]);
  });
});
