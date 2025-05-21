'use client';

import { type ClassAttributes, type HTMLAttributes } from 'react';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import useThemeControl from '@/hooks/use-theme-control';
import { cn } from '@/lib/utils';

import type { ExtraProps } from 'react-markdown';
import useMounted from '@/hooks/use-mounted';

SyntaxHighlighter.registerLanguage('jsx', js);
SyntaxHighlighter.registerLanguage('jsx', ts);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('jsx', tsx);
SyntaxHighlighter.registerLanguage('jsx', bash);

const CodeElement = (
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) => {
  const { isDarkTheme } = useThemeControl();

  const isMounted = useMounted();

  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '');

  const highlighterStyle = isDarkTheme ? oneDark : oneLight;

  if (!match) {
    return (
      <code
        {...rest}
        className={cn(
          className,
          'px-1 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800',
          'font-mono',
        )}
      >
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      PreTag="div"
      language={match[1]}
      style={highlighterStyle}
      showLineNumbers
      className={
        !isMounted
          ? cn(
              '[&_code]:!bg-neutral-50 dark:[&_code]:!bg-[hsl(220,13%,18%)]',
              '[&_code]:!text-[hsl(220,13%,18%)] dark:[&_code]:!text-[hsl(220,14%,71%)]',
              '!bg-neutral-50 dark:!bg-[hsl(220,13%,18%)]',
            )
          : undefined
      }
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default CodeElement;
