import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';

import PostHeader from '../post-header';

const props = {
  title: 'SO Lovely CODE!',
  description: 'first description',
  date: '2022-02-11T14:14:12.000Z',
  lastModified: '2025-06-14T12:38:12.000Z',
  readingTimeMinutes: 5,
};

describe('PostHeader', () => {
  it('should be rendered', () => {
    render(<PostHeader {...props} />);

    expect(screen.getByText('SO Lovely CODE!')).toBeInTheDocument();
    expect(screen.getByText('first description')).toBeInTheDocument();

    const expectedDate = format(new Date('2025-06-14'), 'yyyy.MM.dd.');
    expect(
      screen.getByText(new RegExp(`${expectedDate}.*5 min read`)),
    ).toBeInTheDocument();
  });

  it('should fall back to date when lastModified is absent', () => {
    render(<PostHeader {...props} lastModified={undefined} />);

    const expectedDate = format(new Date('2022-02-11'), 'yyyy.MM.dd.');
    expect(
      screen.getByText(new RegExp(`${expectedDate}.*5 min read`)),
    ).toBeInTheDocument();
  });
});
