import { render, screen } from '@testing-library/react';

import PostHeader from 'components/PostHeader';

const props = {
  title: 'SO Lovely CODE!',
  date: '2022-02-11T14:14:12.000Z',
};

describe('PostHeader', () => {
  it('should be render', () => {
    render(<PostHeader {...props} />);
    expect(screen.getByText('SO Lovely CODE!')).toBeInTheDocument();
    expect(screen.getByText('2022-02-11')).toBeInTheDocument();
  });
});
