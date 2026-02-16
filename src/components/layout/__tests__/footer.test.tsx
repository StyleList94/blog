import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import Footer from '../footer';

describe('Footer', () => {
  it('should be rendered', () => {
    render(<Footer />);

    expect(screen.getByLabelText('View post source')).toHaveAttribute(
      'href',
      'https://github.com/StyleList94/blog/tree/main/posts',
    );

    expect(screen.getByLabelText('라이트 모드')).toBeInTheDocument();
    expect(screen.getByLabelText('시스템 모드')).toBeInTheDocument();
    expect(screen.getByLabelText('다크 모드')).toBeInTheDocument();

    expect(screen.getByText(/© 2026./)).toBeInTheDocument();
    expect(screen.getByText(/@StyleList94/)).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
  });
});
