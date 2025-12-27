import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import Pagination from '../pagination';

describe('Pagination', () => {
  it('should be rendered', () => {
    render(<Pagination />);

    'HEART'.split('').forEach((page, index) => {
      expect(screen.getByRole('link', { name: page })).toHaveAttribute(
        'href',
        index ? `/?page=${index + 1}` : '/',
      );
    });
  });

  it('should highlight for current page', () => {
    const { rerender } = render(<Pagination currentPage={1} />);

    expect(screen.getByRole('link', { name: 'H' })).toHaveClass(
      'text-zinc-950 dark:text-zinc-50',
    );

    'HEART'.split('').forEach((page) => {
      expect(screen.getByRole('link', { name: page })).toHaveClass(
        page === 'H'
          ? 'text-zinc-950 dark:text-zinc-50'
          : 'text-zinc-400 dark:text-zinc-500',
      );
    });

    rerender(<Pagination currentPage={3} />);

    'HEART'.split('').forEach((page) => {
      expect(screen.getByRole('link', { name: page })).toHaveClass(
        page === 'A'
          ? 'text-zinc-950 dark:text-zinc-50'
          : 'text-zinc-400 dark:text-zinc-500',
      );
    });
  });
});
