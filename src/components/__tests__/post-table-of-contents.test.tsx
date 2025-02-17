import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';

import PostTableOfContents from '../post-table-of-contents';

describe('PostTableOfContents', () => {
  const mockData = [
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
  ];

  it('should be rendered correctly', () => {
    render(<PostTableOfContents items={mockData} />);

    const topLevelElement = screen.getByRole('list', { name: 'toc-level-1' });

    const childLevelElement = screen.getAllByRole('list', {
      name: 'toc-level-2',
    });

    expect(within(topLevelElement).getByText('Cocktail')).toHaveAttribute(
      'href',
      '#cocktail',
    );
    expect(within(childLevelElement[0]).getByText('Martini')).toHaveAttribute(
      'href',
      '#martini',
    );
    expect(
      within(childLevelElement[0]).getByText('Long Island Iced Tea'),
    ).toHaveAttribute('href', '#long-island-iced-tea');

    expect(within(topLevelElement).getByText('칵테일')).toHaveAttribute(
      'href',
      '#칵테일',
    );
    expect(within(childLevelElement[1]).getByText('도화')).toHaveAttribute(
      'href',
      '#도화',
    );
    expect(
      within(childLevelElement[1]).getByText('스크류 드라이버'),
    ).toHaveAttribute('href', '#스크류-드라이버');
    expect(
      within(childLevelElement[1]).getByText('피나 콜라다'),
    ).toHaveAttribute('href', '#피나-콜라다');
  });
});
