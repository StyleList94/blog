import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';

import PostCard from '../post-card';

const props = {
  slug: 'so-lovely-code',
  title: 'SO Lovely CODE!',
  description: 'This is a description',
  date: '2022-02-20T10:00:00.000Z',
};

describe('PostCard', () => {
  it('should be rendered', () => {
    render(<PostCard {...props} />);

    expect(
      screen.getByRole('link', { name: /SO Lovely CODE!/ }),
    ).toHaveAttribute('href', '/post/so-lovely-code');
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(
      screen.getByText(
        format(new Date('2022-02-20T10:00:00.000Z'), 'yyyy.MM.dd.'),
      ),
    ).toBeInTheDocument();
  });

  it('should be rendered if post is updated', () => {
    render(<PostCard {...props} lastModified="2025-08-05T14:25:00.000Z" />);

    expect(
      screen.getByRole('link', { name: /SO Lovely CODE!/ }),
    ).toHaveAttribute('href', '/post/so-lovely-code');
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(screen.getByText('Updated')).toBeInTheDocument();
    expect(
      screen.getByText(
        format(new Date('2025-08-05T14:25:00.000Z'), 'yyyy.MM.dd.'),
      ),
    ).toBeInTheDocument();
  });
});
