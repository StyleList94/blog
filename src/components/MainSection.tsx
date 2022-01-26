import styled from '@emotion/styled';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainBlock = styled.main`
  max-width: 1440px;
  margin: 0 auto;
`;

const MainSection = ({ children }: Props) => {
  return <MainBlock>{children}</MainBlock>;
};

export default MainSection;
