import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { cn } from '@/lib/utils';
import Content from './Content';

type Props = {
  content: string;
};

const components: Partial<Components> = {
  h1: ({ ...props }) => <Content.H1 {...props} />,
  h2: ({ ...props }) => <Content.H2 {...props} />,
  h3: ({ ...props }) => <Content.H3 {...props} />,
  h4: ({ ...props }) => <Content.H4 {...props} />,
  h5: ({ ...props }) => <Content.H5 {...props} />,
  h6: ({ ...props }) => <Content.H6 {...props} />,
  p: ({ ...props }) => <Content.Text {...props} />,
  li: ({ ...props }) => <Content.ListItem {...props} />,
  hr: ({ ...props }) => <Content.HR {...props} />,
  table: ({ ...props }) => <Content.Table {...props} />,
  th: ({ ...props }) => <Content.TableHeader {...props} />,
  td: ({ ...props }) => <Content.TableData {...props} />,
  a: ({ children, ...props }) => (
    <a
      className={cn(
        'transition ease-in-out duration-200 leading-normal',
        'text-blue-500',
        'hover:text-blue-600 hover:underline',
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
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
