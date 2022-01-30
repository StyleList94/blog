import { render, screen } from '@testing-library/react';

import Home from '../../pages';
import ThemeProvider from '../../components/ThemeContext';

describe('test', () => {
  it('should be render', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
  });
});
