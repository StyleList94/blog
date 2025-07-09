import { format } from 'date-fns';

import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description: string;
  date: string;
  lastModified?: string;
};

type DateBoxProps = {
  date: string;
  tag: string;
};

const DateBox = ({ date, tag }: DateBoxProps) => (
  <div className="flex justify-end items-center gap-2">
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md px-2 py-0.5',
        'font-medium text-xs text-neutral-600/80 dark:text-neutral-400/80',
        'border border-zinc-300/60 dark:border-zinc-700/40',
      )}
    >
      {tag}
    </span>
    <p className="font-mono text-sm text-neutral-700 dark:text-neutral-200 text-right">
      {format(new Date(date), 'yyyy.MM.dd.')}
    </p>
  </div>
);

const PostHeader = ({ title, description, date, lastModified }: Props) => (
  <section className="flex flex-col gap-6 py-4">
    <div className="flex flex-col gap-3">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
      <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
    <div className="flex flex-col self-end gap-2">
      <DateBox date={date} tag="Created" />
      <DateBox date={lastModified ?? date} tag="Last updated" />
    </div>
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
      <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
    </div>
  </section>
);

export default PostHeader;
