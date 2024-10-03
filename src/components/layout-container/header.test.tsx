import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should be render', () => {
    render(<Header />);

    expect(screen.getByText('STYLISH')).toBeInTheDocument();
    expect(screen.getByText('.LOG')).toBeInTheDocument();
  });
});
