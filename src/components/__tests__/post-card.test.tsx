import '@testing-library/jest-dom/vitest';

import Router from 'next/router';
import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';

import PostCard from '../post-card';

const props = {
  slug: 'so-lovely-code',
  title: 'SO Lovely CODE!',
  description: 'This is a description',
  date: '2022-02-20T10:00:00.000Z',
};

const routerChangeStart = vi.fn();

beforeEach(() => {
  Router.events.on('routeChangeStart', routerChangeStart);
});

afterEach(() => {
  Router.events.off('routeChangeStart', routerChangeStart);
});

describe('PostCard', () => {
  it('should be rendered', () => {
    render(<PostCard {...props} />);

    expect(
      screen.getByRole('link', { name: /SO Lovely CODE!/ }),
    ).toHaveAttribute('href', '/post/so-lovely-code');
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(
      screen.getByText(format(new Date('2022-02-20'), 'yyyy.MM.dd.')),
    ).toBeInTheDocument();
  });
});
