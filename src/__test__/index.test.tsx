import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('test', () => {
  it('should be render', () => {
    render(<Home />);

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
  });
});
