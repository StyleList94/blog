import ReactMarkdown, {
  type Components as MarkdownElement,
} from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import CodeElement from '@/components/code-element';

import '@/styles/post-body.css';

type Props = {
  content: string;
};

const commonStyle = 'transition ease-in-out duration-200 leading-normal';

const components: Partial<MarkdownElement> = {
  h1: ({ children, node, ...props }) => (
    <h1 className={cn(commonStyle, 'text-3xl py-8 font-bold')} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, node, ...props }) => (
    <h2
      className={cn(commonStyle, 'text-2xl py-7 font-bold', 'scroll-mt-16')}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, node, ...props }) => (
    <h3
      className={cn(commonStyle, 'text-xl py-6 font-bold', 'scroll-mt-16')}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, node, ...props }) => (
    <h4 className={cn(commonStyle, 'py-4 font-bold')} {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, node, ...props }) => (
    <h5 className={cn(commonStyle, 'text-sm py-4 font-bold')} {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, node, ...props }) => (
    <h6 className={cn(commonStyle, 'text-xs py-4 font-bold')} {...props}>
      {children}
    </h6>
  ),

  p: ({ children, node, ...props }) => (
    <p className={cn(commonStyle, 'py-2')} {...props}>
      {children}
    </p>
  ),

  blockquote: ({ children, node, ...props }) => (
    <blockquote
      className={cn(
        commonStyle,
        'px-5 py-2 my-3',
        'rounded-md bg-neutral-100 dark:bg-neutral-800',
        'text-neutral-600 dark:text-neutral-300',
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),

  ul: ({ children, node, ...props }) => (
    <ul className={cn(commonStyle, 'list-disc pl-4 py-4')} {...props}>
      {children}
    </ul>
  ),
  li: ({ children, node, ...props }) => (
    <li
      className={cn(commonStyle, 'list-disc ml-4 py-1 first:pt-0 last:pb-0')}
      {...props}
    >
      {children}
    </li>
  ),

  hr: ({ ...props }) => (
    <hr
      className={cn(
        commonStyle,
        'border-0 rounded-md w-full h-px my-5 bg-neutral-600/10 dark:bg-neutral-400/20',
      )}
      {...props}
    />
  ),

  table: ({ children, node, ...props }) => (
    <table className={cn(commonStyle, 'border-collapse my-2')} {...props}>
      {children}
    </table>
  ),
  th: ({ children, node, ...props }) => (
    <th
      className={cn(
        commonStyle,
        'border border-gray-300 dark:border-gray-700 p-2',
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, node, ...props }) => (
    <td
      className={cn(
        commonStyle,
        'border border-gray-300 dark:border-gray-700 p-2',
      )}
      {...props}
    >
      {children}
    </td>
  ),

  a: ({ href, children, node, ...props }) => {
    const isInternal =
      (href as string).startsWith('/') || (href as string).startsWith('#');
    return isInternal ? (
      <Link
        href={href as string}
        className={cn(
          'transition ease-in-out duration-200 leading-normal',
          'text-blue-500',
          'hover:text-blue-600 hover:underline',
        )}
        {...props}
      >
        {children}
      </Link>
    ) : (
      <a
        href={href as string}
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
    );
  },
  code: CodeElement,
};

const PostBody = ({ content }: Props) => (
  <div className="p-4">
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default PostBody;
