import ReactMarkdown, {
  type Components as MarkdownElement,
} from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import Link from 'next/link';
import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

import AnimateProvider from '@/providers/animate-provider';

import ScrollLinked from '@/components/scroll-linked';
import CodeBlock from '@/components/code-block';

import '@/styles/post-body.css';

type Props = {
  content: string;
};

const commonStyle = 'transition ease-in-out duration-200';

const bodyStyle = 'text-sm/6';

const tableCellStyle = cn(
  'px-4 py-2',
  'text-sm text-left [[align=center]]:text-center [&[align=right]]:text-right',
  'border border-neutral-200 dark:border-neutral-700/60',
);

const subHeadingStyle = cn(
  'text-sm/tight font-semibold',
  'scroll-m-20 mt-7',
  'tracking-tight',
  'text-neutral-800 dark:text-neutral-200',
);

const linkStyle = cn(
  'transition ease-in-out duration-200 leading-normal',
  'text-sky-600 dark:text-sky-400',
  '*:text-sky-600 *:dark:text-sky-400',
  'hover:text-sky-800 dark:hover:text-sky-300',
  'hover:border-b hover:border-sky-600 dark:hover:border-sky-400',
);

const components: Partial<MarkdownElement> = {
  h1: ({ children, node, ...props }) => (
    <h1
      className={cn(
        commonStyle,
        'text-lg/tight font-medium',
        'scroll-m-20 tracking-tight',
        'text-neutral-900 dark:text-neutral-100',
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
        'text-base/tight font-semibold',
        'scroll-m-20 pb-2 mt-9 first:mt-0',
        'tracking-tight',
        'border-b border-neutral-200 dark:border-neutral-800',
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, node, ...props }) => (
    <h3 className={cn(commonStyle, subHeadingStyle)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, node, ...props }) => (
    <h4 className={cn(commonStyle, subHeadingStyle)} {...props}>
      {children}
    </h4>
  ),

  p: ({ children, node, ...props }) => (
    <p
      className={cn(
        commonStyle,
        bodyStyle,
        'mt-5',
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
        bodyStyle,
        'mt-5 pl-6 pr-2 py-0.5',
        'italic',
        'border-l-2 border-neutral-300 dark:border-neutral-700',
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),

  ul: ({ children, node, ...props }) => (
    <ul
      className={cn(
        commonStyle,
        bodyStyle,
        'my-5 ml-6 list-disc',
        '[&>li]:mt-2',
        '[&>li>ul]:my-2',
      )}
      {...props}
    >
      {children}
    </ul>
  ),
  li: ({ children, node, ...props }) => (
    <li className={cn(commonStyle, bodyStyle)} {...props}>
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
    <div className="overflow-x-auto my-5">
      <table
        className={cn(
          commonStyle,
          'border-collapse w-full',
          'bg-white dark:bg-neutral-900',
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  tr: ({ children, node, ...props }) => (
    <tr
      className={cn(
        commonStyle,
        'm-0 p-0',
        'border-t border-neutral-100 dark:border-neutral-800',
      )}
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({ children, node, ...props }) => (
    <th
      className={cn(
        commonStyle,
        tableCellStyle,
        'font-semibold',
        'bg-neutral-50/50 dark:bg-neutral-800/50',
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, node, ...props }) => (
    <td className={cn(commonStyle, bodyStyle, tableCellStyle)} {...props}>
      {children}
    </td>
  ),

  a: ({ href, children, node, ...props }) => {
    const hrefStr = href as string;
    const isInternal = hrefStr.startsWith('/') || hrefStr.startsWith('#');

    if (isInternal)
      return (
        <Link
          href={hrefStr as `/post/${string}`}
          className={linkStyle}
          {...props}
        >
          {children}
        </Link>
      );

    return (
      <a
        href={hrefStr}
        className={linkStyle}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  code: CodeBlock,
  img: ({ node, ...props }) => {
    const UNOPTIMIZED_EXTENSIONS = ['svg', 'gif', 'webp'];

    const ext =
      typeof props.src === 'string'
        ? (props.src.split('.').pop()?.toLowerCase() ?? '')
        : '';

    const isUnoptimized = UNOPTIMIZED_EXTENSIONS.includes(ext);

    return (
      <div className="relative w-full aspect-3/2">
        <Image
          fill
          style={{ objectFit: 'contain' }}
          unoptimized={isUnoptimized}
          {...(props as ImageProps)}
        />
      </div>
    );
  },
};

const PostBody = ({ content }: Props) => (
  <div className="py-4">
    <AnimateProvider>
      <ScrollLinked />
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeUnwrapImages]}
      >
        {content}
      </ReactMarkdown>
    </AnimateProvider>
  </div>
);

export default PostBody;
