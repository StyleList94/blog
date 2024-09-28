import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import Content from './Content';

type Props = {
  content: string;
};

const components = {
  h1: ({ ...props }) => <Content.H1 {...props} />,
  h2: ({ ...props }) => <Content.H2 {...props} />,
  h3: ({ ...props }) => <Content.H3 {...props} />,
  h4: ({ ...props }) => <Content.H4 {...props} />,
  h5: ({ ...props }) => <Content.H5 {...props} />,
  h6: ({ ...props }) => <Content.H6 {...props} />,
  p: ({ ...props }) => <Content.Text {...props} />,
  li: ({ ...props }) => <Content.ListItem {...props} />,
  table: ({ ...props }) => <Content.Table {...props} />,
  hr: ({ ...props }) => <Content.HR {...props} />,
  code: Content.Code,
};

const PostBody = ({ content }: Props) => (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );

export default PostBody;
