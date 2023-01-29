import { render, screen } from '@testing-library/react';

import IndexPage from '../../pages';
import ThemeProvider from '../../contexts/ThemeContext';

const postList = [
  {
    slug: 'test-post',
    title: 'StyleList94',
    description: 'just a test',
    date: '2022-05-08T12:25:00.000Z',
    coverImage: '/assets/images/cover.png',
    ogImage: '/assets/images/cover.png',
    content: '\n' + 'content',
  },
];

describe('test', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should be render', () => {
    render(
      <ThemeProvider>
        <IndexPage postList={postList} />
      </ThemeProvider>,
    );

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
    expect(screen.getByText('just a test')).toBeInTheDocument();
    expect(screen.getByText('2022-05-08')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'StyleList94' })).toHaveAttribute(
      'href',
      '/post/test-post',
    );
  });
});
