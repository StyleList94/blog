import '@testing-library/jest-dom/vitest';

import * as navigation from 'next/navigation';

import { render, screen } from '@testing-library/react';

import * as postService from '@/lib/services/post';

import MainPage from './page';

const wishList = [
  {
    slug: 'buy-dream-car',
    title: 'MINI Cooper Convertible',
    description: '진짜 갖고싶다!',
    date: '2025-07-10T14:50:00.000Z',
  },
  {
    slug: 'traveling-in-europe',
    title: '유럽 여행',
    description: '유럽일주 하고싶다',
    date: '2025-07-10T14:50:00.000Z',
  },
  {
    slug: 'marry',
    title: '결혼',
    description: '하려면 여친부터...',
    date: '2025-07-10T14:50:00.000Z',
  },
  {
    slug: 'create-a-brewery',
    title: '양조장 만들기',
    description: '미래 먹거리',
    date: '2025-07-10T14:50:00.000Z',
  },
  {
    slug: 'band-activity',
    title: '밴드에서 일렉기타잡기',
    description: '매일 연습만이 살길이다...',
    date: '2025-07-10T14:50:00.000Z',
  },
];

vi.mock('next/navigation', async () => {
  const originalModule =
    await vi.importActual<typeof navigation>('next/navigation');
  return {
    ...originalModule,
    redirect: vi.fn(),
  };
});

afterEach(() => {
  vi.spyOn(postService, 'getPostsByPage').mockRestore();
});

describe('<MainPage />', () => {
  it('should be rendered', async () => {
    vi.spyOn(postService, 'getPostsByPage').mockResolvedValue({
      postList: wishList,
      total: wishList.length,
      lastPage: 1,
    });

    const searchParams = Promise.resolve({});
    render(await MainPage({ searchParams }));

    wishList.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.description)).toBeInTheDocument();
    });
  });

  test('page query parameter is valid', async () => {
    vi.spyOn(postService, 'getPostsByPage').mockResolvedValue({
      postList: wishList,
      total: wishList.length,
      lastPage: 1,
    });

    const searchParams = Promise.resolve({ page: '1' });
    render(await MainPage({ searchParams }));

    wishList.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.description)).toBeInTheDocument();
    });
  });

  test('page number is greater than last page', async () => {
    vi.spyOn(postService, 'getPostsByPage').mockResolvedValue({
      postList: [],
      total: wishList.length,
      lastPage: 1,
    });

    const searchParams = Promise.resolve({ page: '2' });
    render(await MainPage({ searchParams }));

    wishList.forEach((post) => {
      expect(screen.queryByText(post.title)).not.toBeInTheDocument();
      expect(screen.queryByText(post.description)).not.toBeInTheDocument();
    });

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
