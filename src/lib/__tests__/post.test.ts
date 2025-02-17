import { generateTOC } from '../post';

const mockContent = `
## Cocktail

###  Martini

### Long Island Iced Tea

## 칵테일

### 도화

### 스크류 드라이버

### 피나 콜라다
`;

describe('lib/post', () => {
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
});
