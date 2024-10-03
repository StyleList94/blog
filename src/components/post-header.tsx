import { format } from 'date-fns';

type Props = {
  title: string;
  description: string;
  date: string;
};

const PostHeader = ({ title, description, date }: Props) => (
  <section className="flex flex-col gap-6 p-4">
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl lg:text-3xl">{title}</h1>
      <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
    <p className="font-mono text-sm text-neutral-700 dark:text-neutral-200 text-right">
      {format(new Date(date), 'yyyy-MM-dd')}
    </p>
    <hr className="border-0 rounded-md w-full h-px bg-neutral-600/10 dark:bg-neutral-400/20" />
  </section>
);

export default PostHeader;
