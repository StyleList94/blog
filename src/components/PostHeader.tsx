import styled from '@emotion/styled';
import { format } from 'date-fns';

type Props = {
  title: string;
  date: string;
};

const PostHeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const PostTitle = styled.h1`
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const PostDate = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.date};
`;

const PostHeader = ({ title, date }: Props) => {
  return (
    <PostHeaderBlock>
      <PostTitle>{title}</PostTitle>
      <PostDate>{format(new Date(date), 'yyyy-MM-dd')}</PostDate>
    </PostHeaderBlock>
  );
};

export default PostHeader;
