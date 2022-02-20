import { render, screen } from '@testing-library/react';

import IndexPage from '../../pages';
import ThemeProvider from '../../components/ThemeContext';

describe('test', () => {
  it('should be render', () => {
    render(
      <ThemeProvider>
        <IndexPage postList={[]} />
      </ThemeProvider>,
    );

    expect(screen.getByText('StyleList94')).toBeInTheDocument();
    expect(screen.getByText('Stylish Diary')).toBeInTheDocument();
  });
});
