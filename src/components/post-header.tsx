import { format } from 'date-fns';

type Props = {
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  readingTimeMinutes: number;
};

const PostHeader = ({
  title,
  description,
  date,
  lastModified,
  readingTimeMinutes,
}: Props) => (
  <section className="flex flex-col gap-1.5 py-4">
    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
      {format(new Date(lastModified ?? date), 'yyyy.MM.dd.')} ·{' '}
      {readingTimeMinutes} min read
    </span>
    <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
      {title}
    </h1>
    <p className="text-sm text-neutral-500 dark:text-neutral-400">
      {description}
    </p>
  </section>
);

export default PostHeader;
