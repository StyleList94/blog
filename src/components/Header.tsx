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
  background-color: #fff;
  border-bottom: 1px solid #f1f3f5;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
`;

const BrandTitle = styled.a`
  font-family: 'Comfortaa', cursive;
  font-size: 1.5rem;
`;

const BrandSubTitle = styled.span`
  font-family: 'Comfortaa', cursive;
  font-size: 0.875rem;
  color: #adb5bd;
`;

const HeaderSpacing = styled.div`
  margin-top: 6rem;
`;

const Header = () => {
  return (
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
};

export default Header;
