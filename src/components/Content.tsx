import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { memo } from 'react';

type SyntaxHighlighterStyle = {
  [key: string]: { [key: string]: string };
};

const commonStyle = css`
  font-family: 'Nanum Gothic', sans-serif;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
`;

const H1 = styled.h1`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const H2 = styled.h2`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const H3 = styled.h3`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const H4 = styled.h4`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const H5 = styled.h5`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const H6 = styled.h6`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const Text = styled.p`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const ListItem = styled.li`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
`;

const Table = styled.table`
  ${commonStyle}
  color: ${({ theme }) => theme.text};
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.text};
  }
`;

const HR = styled.hr`
  ${commonStyle}
  border: 1px solid ${({ theme }) => theme.horizontalRule};
`;

const Code = memo(function MemoizationCode({
  inline,
  className,
  children,
  ...props
}: CodeProps) {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={a11yDark as SyntaxHighlighterStyle}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
});

const Content = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  ListItem,
  Table,
  HR,
  Code,
};

export default Content;
