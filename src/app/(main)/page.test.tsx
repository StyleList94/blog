import '@testing-library/jest-dom/vitest';

import { render, screen, within } from '@testing-library/react';

import * as postService from '@/lib/services/post';

import MainPage from './page';

const postsAcrossYears = [
  {
    slug: 'review-2025',
    title: '2025년 회고',
    description: '내맘대로 정리하는 2025년',
    date: '2025-12-27T00:00:00.000Z',
  },
  {
    slug: 'react-19',
    title: 'React 19 둘러보기',
    description: 'React 192% 활용하기',
    date: '2025-08-19T00:00:00.000Z',
  },
  {
    slug: 'review-2024',
    title: '2024년 회고',
    description: '돌아보는 2024년',
    date: '2024-12-30T00:00:00.000Z',
  },
];

afterEach(() => {
  vi.spyOn(postService, 'getAllPosts').mockRestore();
});

describe('<MainPage />', () => {
  it('should render posts grouped by year with year headings', async () => {
    vi.spyOn(postService, 'getAllPosts').mockResolvedValue(postsAcrossYears);

    render(await MainPage());

    const yearHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(yearHeadings).toHaveLength(2);
    expect(yearHeadings[0]).toHaveTextContent('2025');
    expect(yearHeadings[1]).toHaveTextContent('2024');

    postsAcrossYears.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.description)).toBeInTheDocument();
    });
  });

  it('should preserve post order within each year', async () => {
    vi.spyOn(postService, 'getAllPosts').mockResolvedValue(postsAcrossYears);

    render(await MainPage());

    const year2025Section = screen
      .getByRole('heading', { level: 2, name: '2025' })
      .closest('section');
    expect(year2025Section).not.toBeNull();

    const titlesIn2025 = within(year2025Section!).getAllByRole('link');
    expect(titlesIn2025[0]).toHaveTextContent('2025년 회고');
    expect(titlesIn2025[1]).toHaveTextContent('React 19 둘러보기');
  });

  it('should render empty state when no posts exist', async () => {
    vi.spyOn(postService, 'getAllPosts').mockResolvedValue([]);

    render(await MainPage());

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.getByLabelText('rocket-icon')).toBeInTheDocument();
    expect(
      screen.getByText('이 페이지가 만들어질 수 있도록'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('필력을 최대한 끌어 올리겠습니다!'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '첫 페이지로 날아가기' }),
    ).toHaveAttribute('href', '/');
  });
});
