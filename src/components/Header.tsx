import styled from '@emotion/styled';
import Link from 'next/link';

const HeaderBlock = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
`;

const BrandTitle = styled.span`
  font-family: 'Comfortaa', cursive;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const BrandSubTitle = styled.span`
  font-family: 'Comfortaa', cursive;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.subText};
`;

const HeaderSpacing = styled.div`
  height: 6rem;
`;

const Header = () => (
    <>
      <HeaderBlock>
        <Brand>
          <Link href="/" passHref>
            <BrandTitle>StyleList94</BrandTitle>
          </Link>
          <BrandSubTitle>Stylish Diary</BrandSubTitle>
        </Brand>
      </HeaderBlock>
      <HeaderSpacing />
    </>
  );

export default Header;
