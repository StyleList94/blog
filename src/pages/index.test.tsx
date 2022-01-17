import { render, screen } from '@testing-library/react';
import Home from '.';

describe('test', () => {
  it('should be render', () => {
    render(<Home />);

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
  });
});
