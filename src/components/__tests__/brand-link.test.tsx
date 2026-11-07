import '@testing-library/jest-dom/vitest';

import { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';

import BrandLink from '../brand-link';

describe('BrandLink', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('defers the browser-specific brand to the surrounding server fallback', () => {
    const html = renderToString(
      <Suspense fallback={<span>Brand placeholder</span>}>
        <BrandLink />
      </Suspense>,
    );

    expect(html).toContain('Brand placeholder');
  });

  it('renders the browser date on Hangul Day', () => {
    vi.useFakeTimers().setSystemTime(new Date('2026-10-09T12:00:00+09:00'));

    render(
      <Suspense fallback={null}>
        <BrandLink />
      </Suspense>,
    );

    expect(screen.getByRole('link', { name: '맵시.일기' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
