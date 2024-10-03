import Link from 'next/link';
import { format } from 'date-fns';

import type { Post } from '@/types/post';

type Props = Pick<Post, 'slug' | 'title' | 'description' | 'date'>;

const PostCard = ({ slug, title, description, date }: Props) => (
  <div className="flex flex-col w-full max-w-[46.5rem] p-3">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`/post/${slug}`} passHref>
            <span className="text-xl lg:text-2xl hover:underline">{title}</span>
          </Link>
          <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs lg:text-sm text-neutral-700 dark:text-neutral-200">
            {format(new Date(date), 'yyyy-MM-dd')}
          </span>
        </div>
      </div>
      <hr className="border-0 rounded-md w-full h-px bg-neutral-600/10 dark:bg-neutral-400/20" />
    </div>
  </div>
);

export default PostCard;
