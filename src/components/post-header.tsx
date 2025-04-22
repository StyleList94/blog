import { format } from 'date-fns';

type Props = {
  title: string;
  description: string;
  date: string;
};

const PostHeader = ({ title, description, date }: Props) => (
  <section className="flex flex-col gap-6 p-4">
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
    <p className="font-mono text-sm text-neutral-700 dark:text-neutral-200 text-right">
      {format(new Date(date), 'yyyy-MM-dd')}
    </p>
    <div className="flex items-center gap-3 py-4">
      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
      <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
      <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
    </div>
  </section>
);

export default PostHeader;
