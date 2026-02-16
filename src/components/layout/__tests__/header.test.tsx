import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import Header from '../header';

describe('Header', () => {
  it('should be rendered', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-08'));

    render(<Header />);

    expect(screen.getByText('stylish')).toBeInTheDocument();
    expect(screen.getByText('.log')).toBeInTheDocument();
  });

  it('should be rendered if today is hangul day', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-09'));

    render(<Header />);

    expect(screen.getByText('맵시')).toBeInTheDocument();
    expect(screen.getByText('.일기')).toBeInTheDocument();
  });
});
