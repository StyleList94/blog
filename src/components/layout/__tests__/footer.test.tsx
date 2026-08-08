import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { SeasonalBrandLink } from '../footer';

describe('Footer', () => {
  it('should be rendered', async () => {
    render(await SeasonalBrandLink());

    expect(screen.getByText('stylish')).toBeInTheDocument();
    expect(screen.getByText('.log')).toBeInTheDocument();
  });

  it('should render hangul brand on hangul day', async () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-10-09'));

    render(await SeasonalBrandLink());

    expect(screen.getByText('맵시')).toBeInTheDocument();
    expect(screen.getByText('.일기')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
