import type { ClassAttributes, HTMLAttributes, JSX } from 'react';
import type { ExtraProps } from 'react-markdown';
import type { BundledLanguage } from 'shiki';

import { codeToHtml } from 'shiki';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';

import { cn } from '@/lib/utils';

import '@/styles/code-block.css';

type IconType = 'bash' | 'json' | 'default';

const languageRegExp = /language-(\w+)(:title=(.+))?/;
const showLineNumberRegExp = /ts(x)?|js(on)?|css/;

const iconElement: Record<IconType, { className: string; path: JSX.Element }> =
  {
    bash: {
      className: 'lucide lucide-terminal-icon lucide-terminal',
      path: (
        <>
          <path d="M12 19h8" />
          <path d="m4 17 6-6-6-6" />
        </>
      ),
    },
    json: {
      className: 'lucide lucide-braces-icon lucide-braces',
      path: (
        <>
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
          <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
        </>
      ),
    },
    default: {
      className: 'lucide lucide-code-icon lucide-code',
      path: (
        <>
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </>
      ),
    },
  };

const BlockIcon = ({ language }: { language: string }) => {
  const iconType: IconType = ['bash', 'json'].includes(language)
    ? (language as IconType)
    : ('default' as const);

  const { className, path } = iconElement[iconType];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className, 'select-none')}
    >
      {path}
    </svg>
  );
};

const CodeBlock = async (
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) => {
  const { children, className, node, ...rest } = props;

  const match = languageRegExp.exec(className || '');

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

  const language = match[1] as BundledLanguage;
  const showLineNumber = showLineNumberRegExp.test(match[1]);
  const title = match[3];

  const out = await codeToHtml(String(children).replace(/\n$/, ''), {
    lang: language,
    themes: {
      light: 'one-light',
      dark: 'github-dark',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
    ],
  });

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg',
        'bg-[#FAFAFA] dark:bg-[#24292e]',
      )}
    >
      {title && (
        <>
          <div className={cn('flex items-center gap-2 px-5 py-3')}>
            <div className="text-neutral-400 dark:text-neutral-500">
              <BlockIcon language={language} />
            </div>
            <span
              className={cn(
                'overflow-hidden text-ellipsis break-normal whitespace-nowrap',
                'font-sans text-xs text-neutral-500 dark:text-neutral-400',
              )}
            >
              {title}
            </span>
          </div>
          <hr className="border-none h-px w-full bg-zinc-200/50 dark:bg-zinc-700/50" />
        </>
      )}
      <div
        className={cn(
          'code-block',
          showLineNumber && 'code-block__with-line-numbers',
          'overflow-x-auto',
        )}
        dangerouslySetInnerHTML={{ __html: out }}
      />
    </div>
  );
};

export default CodeBlock;
