import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import Footer from '../footer';

describe('Footer', () => {
  it('should be rendered', () => {
    render(<Footer />);

    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/StyleList94/blog/tree/main/posts',
    );

    expect(screen.getByLabelText('icon-light-mode')).toBeInTheDocument();
    expect(screen.getByLabelText('icon-system')).toBeInTheDocument();
    expect(screen.getByLabelText('icon-dark-mode')).toBeInTheDocument();

    expect(screen.getByText(/© 2025./)).toBeInTheDocument();
    expect(screen.getByText(/@StyleList94/)).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
  });
});
