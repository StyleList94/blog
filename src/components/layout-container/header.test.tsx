import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should be render', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-08'));

    render(<Header />);

    expect(screen.getByText('STYLISH')).toBeInTheDocument();
    expect(screen.getByText('.LOG')).toBeInTheDocument();
  });

  it('should be render if today is hangul day', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-09'));

    render(<Header />);

    expect(screen.getByText('스타일리시')).toBeInTheDocument();
    expect(screen.getByText('.로그')).toBeInTheDocument();
  });
});
