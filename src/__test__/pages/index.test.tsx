import { render, screen } from '@testing-library/react';

import IndexPage from '../../pages';
import ThemeProvider from '../../components/ThemeContext';

describe('test', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

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
