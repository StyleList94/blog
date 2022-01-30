import styled from '@emotion/styled';
import { useTheme } from './ThemeContext';

const FooterBlock = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
`;

const TitleBlock = styled.div``;

const ToggleThemeButton = styled.button`
  outline: none;
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  cursor: pointer;

  &:hover,
  &:active {
    text-decoration: underline;
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;

const Footer = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <FooterBlock>
      <TitleBlock>
        <ToggleThemeButton onClick={() => toggleTheme()}>
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </ToggleThemeButton>
      </TitleBlock>
    </FooterBlock>
  );
};

export default Footer;
