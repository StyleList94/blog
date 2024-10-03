import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';

import PostHeader from './post-header';

const props = {
  title: 'SO Lovely CODE!',
  description: 'first description',
  date: '2022-02-11T14:14:12.000Z',
};

describe('PostHeader', () => {
  it('should be render', () => {
    render(<PostHeader {...props} />);
    expect(screen.getByText('SO Lovely CODE!')).toBeInTheDocument();
    expect(screen.getByText('first description')).toBeInTheDocument();
    expect(
      screen.getByText(format(new Date('2022-02-11'), 'yyyy-MM-dd')),
    ).toBeInTheDocument();
  });
});
