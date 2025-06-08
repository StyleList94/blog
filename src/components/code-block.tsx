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
          'relative rounded',
          'px-[0.3rem] py-[0.2rem]',
          'bg-neutral-100 dark:bg-neutral-800',
          'font-mono text-sm text-neutral-900 dark:text-neutral-100',
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

  const showLineNumber = /ts(x)?|js(on)?|css/.test(match[1]);

  return (
    <div
      className={cn(
        'code-block',
        showLineNumber && 'code-block__with-line-numbers',
        'overflow-x-auto',
        'bg-[#FAFAFA] dark:bg-[#24292e]',
      )}
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: out }}
    />
  );
};

export default CodeBlock;
