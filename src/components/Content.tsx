import type { ClassAttributes, HTMLAttributes, PropsWithChildren } from 'react';
import type { ExtraProps } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';

const commonStyle = 'transition ease-in-out duration-200 leading-normal';

const H1 = ({ children }: PropsWithChildren) => (
  <h1 className={cn(commonStyle, 'text-3xl my-5 font-bold')}>{children}</h1>
);

const H2 = ({ children }: PropsWithChildren) => (
  <h2 className={cn(commonStyle, 'text-2xl my-[1.125rem] font-bold')}>
    {children}
  </h2>
);

const H3 = ({ children }: PropsWithChildren) => (
  <h3 className={cn(commonStyle, 'text-xl my-4 font-bold')}>{children}</h3>
);

const H4 = ({ children }: PropsWithChildren) => (
  <h4 className={cn(commonStyle, 'my-3.5 font-bold')}>{children}</h4>
);

const H5 = ({ children }: PropsWithChildren) => (
  <h5 className={cn(commonStyle, 'text-sm my-3 font-bold')}>{children}</h5>
);

const H6 = ({ children }: PropsWithChildren) => (
  <h6 className={cn(commonStyle, 'text-xs my-2.5 font-bold')}>{children}</h6>
);

const Text = ({ children }: PropsWithChildren) => (
  // TODO: CODE Font 추가
  <p className={cn(commonStyle)}>{children}</p>
);

const ListItem = ({ children }: PropsWithChildren) => (
  <li className={cn(commonStyle, 'list-disc ml-4')}>{children}</li>
);

const HR = () => (
  <hr
    className={cn(
      commonStyle,
      'border border-gray-200 dark:border-gray-600 my-5 ',
    )}
  />
);

const Table = ({ children }: PropsWithChildren) => (
  <table className={cn(commonStyle, 'border-collapse')}>{children}</table>
);

const TableHeader = ({ children }: PropsWithChildren) => (
  <th
    className={cn(
      commonStyle,
      'border border-gray-300 dark:border-gray-700 p-2',
    )}
  >
    {children}
  </th>
);

const TableData = ({ children }: PropsWithChildren) => (
  <td
    className={cn(
      commonStyle,
      'border border-gray-300 dark:border-gray-700 p-2',
    )}
  >
    {children}
  </td>
);

function Code(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const { children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SyntaxHighlighter PreTag="div" language={match[1]} style={a11yDark}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

const Content = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  ListItem,
  HR,
  Table,
  TableHeader,
  TableData,
  Code,
};

export default Content;
