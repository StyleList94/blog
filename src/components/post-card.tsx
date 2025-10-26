import type { Post } from '@/types/post';

import Link from 'next/link';
import { format } from 'date-fns';

type Props = Pick<
  Post,
  'slug' | 'title' | 'description' | 'date' | 'lastModified'
>;

const PostCard = ({ slug, title, description, date, lastModified }: Props) => (
  <div className="flex flex-col gap-4 w-full pt-4">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Link
          href={`/post/${slug}`}
          className="text-lg sm:text-xl lg:text-2xl font-medium hover:underline"
        >
          {title}
        </Link>
        <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-2 font-mono text-xs lg:text-sm">
          <span className="font-normal text-neutral-400 dark:text-neutral-500">
            {lastModified ? 'Updated' : 'Created'}
          </span>
          <span className="text-neutral-700 dark:text-neutral-200">
            {format(new Date(lastModified ?? date), 'yyyy.MM.dd.')}
          </span>
        </div>
      </div>
    </div>
    <hr className="border-0 rounded-md w-full h-px bg-neutral-600/10 dark:bg-neutral-400/20" />
  </div>
);

export default PostCard;
