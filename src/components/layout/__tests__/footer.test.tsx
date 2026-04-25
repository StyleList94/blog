import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import Footer from '../footer';

describe('Footer', () => {
  it('should be rendered', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-08'));

    render(<Footer />);

    expect(screen.getByLabelText('라이트 모드')).toBeInTheDocument();
    expect(screen.getByLabelText('시스템 모드')).toBeInTheDocument();
    expect(screen.getByLabelText('다크 모드')).toBeInTheDocument();

    expect(screen.getByText('stylish')).toBeInTheDocument();
    expect(screen.getByText('.log')).toBeInTheDocument();

    expect(screen.getByText(/© 2026./)).toBeInTheDocument();
    expect(screen.getByText(/@StyleList94/)).toHaveAttribute(
      'href',
      'https://github.com/StyleList94',
    );
  });

  it('should render hangul brand on hangul day', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-09'));

    render(<Footer />);

    expect(screen.getByText('맵시')).toBeInTheDocument();
    expect(screen.getByText('.일기')).toBeInTheDocument();
  });
});
