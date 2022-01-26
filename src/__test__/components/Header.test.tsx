import { render, screen } from '@testing-library/react';

import Header from '../../components/Header';

describe('Header', () => {
  it('should be render', () => {
    render(<Header />);

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
    expect(screen.getByText('Stylish Diary')).toBeInTheDocument();
  });
});
