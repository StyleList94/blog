import styled from '@emotion/styled';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainBlock = styled.main`
  max-width: 1440px;
  margin: 0 auto;
`;

const BodyBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  z-index: -1;
  transition: background-color 0.2s ease-in-out;
`;

const MainSection = ({ children }: Props) => {
  return (
    <>
      <BodyBlock />
      <MainBlock>{children}</MainBlock>
    </>
  );
};

export default MainSection;
