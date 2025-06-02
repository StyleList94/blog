import { codeToHtml } from 'shiki';

import type { BundledLanguage } from 'shiki';
import type { ClassAttributes, HTMLAttributes } from 'react';
import type { ExtraProps } from 'react-markdown';

import { cn } from '@/lib/utils';

const CodeBlock = async (
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) => {
  const { children, className, node, ...rest } = props;

  const match = /language-(\w+)/.exec(className || '');

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

  const out = await codeToHtml(String(children).replace(/\n$/, ''), {
    lang: match[1] as BundledLanguage,
    themes: {
      light: 'one-light',
      dark: 'github-dark',
    },
  });

  return (
    <div className={cn('overflow-x-auto')}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: out }} />
    </div>
  );
};

export default CodeBlock;
