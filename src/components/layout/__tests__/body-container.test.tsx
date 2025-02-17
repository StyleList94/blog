import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import BodyContainer from '../body-container';

describe('BodyContainer', () => {
  it('should be rendered', () => {
    render(
      <BodyContainer>
        <p>Body Shot</p>
      </BodyContainer>,
    );

    expect(screen.getByText(/Body Shot/)).toBeInTheDocument();
  });
});
