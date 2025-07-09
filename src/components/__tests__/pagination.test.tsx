import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import Pagination from '../pagination';

describe('Pagination', () => {
  it('should be rendered', () => {
    render(<Pagination />);

    'LOVE'.split('').forEach((page, index) => {
      expect(screen.getByRole('link', { name: page })).toHaveAttribute(
        'href',
        index ? `/?page=${index + 1}` : '/',
      );
    });
  });

  it('should highlight for current page', () => {
    const { rerender } = render(<Pagination currentPage={1} />);

    expect(screen.getByRole('link', { name: 'L' })).toHaveClass(
      'text-zinc-950 dark:text-zinc-50',
    );

    'LOVE'.split('').forEach((page) => {
      expect(screen.getByRole('link', { name: page })).toHaveClass(
        page === 'L'
          ? 'text-zinc-950 dark:text-zinc-50'
          : 'text-zinc-400 dark:text-zinc-500',
      );
    });

    rerender(<Pagination currentPage={3} />);

    'LOVE'.split('').forEach((page) => {
      expect(screen.getByRole('link', { name: page })).toHaveClass(
        page === 'V'
          ? 'text-zinc-950 dark:text-zinc-50'
          : 'text-zinc-400 dark:text-zinc-500',
      );
    });
  });
});
