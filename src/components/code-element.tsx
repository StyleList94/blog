'use client';

import { type ClassAttributes, type HTMLAttributes } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { cn } from '@/lib/utils';

import type { ExtraProps } from 'react-markdown';
import useMounted from '@/hooks/use-mounted';
import { useTheme } from 'next-themes';

const CodeElement = (
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) => {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();

  const { children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '');

  const highlighterStyle = resolvedTheme === 'dark' ? oneDark : oneLight;

  if (!mounted) {
    return null;
  }

  return match ? (
    <SyntaxHighlighter
      PreTag="div"
      language={match[1]}
      style={highlighterStyle}
      showLineNumbers
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code
      {...rest}
      className={cn(
        className,
        'px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800',
        'font-mono',
      )}
    >
      {children}
    </code>
  );
};

export default CodeElement;
