import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import IndexPage from '../../pages';

const postList = [
  {
    slug: 'test-post',
    title: 'StyleList94',
    description: 'just a test',
    date: '2022-05-08T12:25:00.000Z',
    coverImage: '/assets/images/cover.png',
    ogImage: '/assets/images/cover.png',
    content: `${'\n'}${'content'}`,
  },
];

describe('test', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  it('should be render', () => {
    render(<IndexPage postList={postList} />);

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
    expect(screen.getByText('just a test')).toBeInTheDocument();
    expect(screen.getByText('2022-05-08')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'StyleList94' })).toHaveAttribute(
      'href',
      '/post/test-post',
    );
  });
});
