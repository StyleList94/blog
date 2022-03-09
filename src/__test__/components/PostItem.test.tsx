import Router from 'next/router';
import { render, screen } from '@testing-library/react';
import format from 'date-fns/format';

import PostItem from '@/components/PostItem';

const props = {
  slug: 'so-lovely-code',
  title: 'SO Lovely CODE!',
  description: 'This is a description',
  date: '2022-02-20T10:00:00.000Z',
};

const routerChangeStart = jest.fn();

beforeEach(() => {
  Router.events.on('routeChangeStart', routerChangeStart);
});

afterEach(() => {
  Router.events.off('routeChangeStart', routerChangeStart);
});

describe('PostItem', () => {
  it('should be render', () => {
    render(<PostItem {...props} />);

    expect(
      screen.getByRole('link', { name: /SO Lovely CODE!/ }),
    ).toHaveAttribute('href', '/post/so-lovely-code');
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(
      screen.getByText(format(new Date('2022-02-20'), 'yyyy-MM-dd')),
    ).toBeInTheDocument();
  });
});
