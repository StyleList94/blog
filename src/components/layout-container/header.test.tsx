import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should be render', () => {
    render(<Header />);

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
    expect(screen.getByText('Stylish Diary')).toBeInTheDocument();
  });
});
