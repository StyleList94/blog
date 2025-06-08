import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import MainContainer from '../main-container';

describe('MainContainer', () => {
  it('should be rendered', () => {
    render(
      <MainContainer>
        <p>Body Shot</p>
      </MainContainer>,
    );

    expect(screen.getByText(/Body Shot/)).toBeInTheDocument();
  });
});
