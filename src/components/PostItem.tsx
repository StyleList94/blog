import Link from 'next/link';
import styled from '@emotion/styled';
import format from 'date-fns/format';

import { Post } from 'types/post';

type Props = Pick<Post, 'slug' | 'title' | 'description' | 'date'>;

const PostItemBlock = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentInfo = styled.div`
  line-height: 1.5;

  p {
    font-family: 'Nanum Gothic', sans-serif;
    color: ${({ theme }) => theme.subText};

    margin-block-start: 0.25rem;
  }
`;

const Title = styled.a`
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 500;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};

  &:hover {
    text-decoration: underline;
  }
`;

const ContentDate = styled.div`
  text-align: right;

  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.date};
  }
`;

const PostItem = ({ slug, title, description, date }: Props) => {
  return (
    <PostItemBlock>
      <div>
        <div />
      </div>
      <Content>
        <ContentInfo>
          <Link href={`/post/${slug}`} passHref>
            <Title>{title}</Title>
          </Link>
          <p>{description}</p>
        </ContentInfo>
        <ContentDate>
          <span>{format(new Date(date), 'yyyy-MM-dd')}</span>
        </ContentDate>
      </Content>
    </PostItemBlock>
  );
};

export default PostItem;
