import ReactMarkdown, {
  type Components as MarkdownElement,
} from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import ScrollLinked from '@/components/scroll-linked';
import CodeBlock from '@/components/code-block';

import '@/styles/post-body.css';

type Props = {
  content: string;
};

const commonStyle = 'transition ease-in-out duration-200 leading-relaxed';

const components: Partial<MarkdownElement> = {
  h1: ({ children, node, ...props }) => (
    <h1
      className={cn(
        commonStyle,
        'text-4xl font-extrabold',
        'mt-12 mb-8',
        'leading-tight',
        'bg-linear-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400',
        'bg-clip-text text-transparent',
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, node, ...props }) => (
    <h2
      className={cn(
        commonStyle,
        'text-2xl font-bold',
        'mt-10 mb-6',
        'leading-snug',
        'scroll-mt-16',
        'border-b border-neutral-200 dark:border-neutral-800',
        'pb-3',
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, node, ...props }) => (
    <h3
      className={cn(
        commonStyle,
        'text-xl font-bold',
        'mt-8 mb-4',
        'leading-snug',
        'scroll-mt-16',
        'text-neutral-800 dark:text-neutral-200',
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, node, ...props }) => (
    <h4
      className={cn(commonStyle, 'text-lg font-bold', 'mt-6 mb-3')}
      {...props}
    >
      {children}
    </h4>
  ),

  p: ({ children, node, ...props }) => (
    <p
      className={cn(
        commonStyle,
        'my-4',
        'leading-relaxed',
        'text-neutral-800 dark:text-neutral-200',
      )}
      {...props}
    >
      {children}
    </p>
  ),

  blockquote: ({ children, node, ...props }) => (
    <blockquote
      className={cn(
        commonStyle,
        'px-6 py-3 my-6',
        'leading-relaxed',
        'rounded-lg bg-neutral-50 dark:bg-neutral-900',
        'text-neutral-700 dark:text-neutral-300',
        'border-l-4 border-neutral-300 dark:border-neutral-700',
        'italic',
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),

  ul: ({ children, node, ...props }) => (
    <ul
      className={cn(commonStyle, 'list-disc pl-6', 'my-4', 'space-y-2.5')}
      {...props}
    >
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
    <div className="overflow-x-auto my-6">
      <table
        className={cn(
          commonStyle,
          'border-collapse w-full',
          'bg-white dark:bg-neutral-900',
          'shadow-xs rounded-lg overflow-hidden',
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, node, ...props }) => (
    <th
      className={cn(
        commonStyle,
        'border-b-2 border-neutral-200 dark:border-neutral-800',
        'bg-neutral-50 dark:bg-neutral-800',
        'p-3 text-left',
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
        'border-b border-neutral-100 dark:border-neutral-800',
        'p-3',
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
          'text-blue-600 dark:text-blue-400',
          'hover:text-blue-800 dark:hover:text-blue-300',
          'hover:border-blue-600 dark:hover:border-blue-400',
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
          'text-blue-600 dark:text-blue-400',
          'hover:text-blue-800 dark:hover:text-blue-300',
          'hover:border-blue-600 dark:hover:border-blue-400',
          'inline-flex items-center gap-1',
        )}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  },
  code: CodeBlock,
};

const PostBody = ({ content }: Props) => (
  <div className="p-4">
    <ScrollLinked>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </ScrollLinked>
  </div>
);

export default PostBody;
