import type { Post } from '@/types/post';

import Link from 'next/link';
import { format } from 'date-fns';

type Props = Pick<
  Post,
  'slug' | 'title' | 'description' | 'date' | 'lastModified'
>;

const PostCard = ({ slug, title, description, date, lastModified }: Props) => (
  <div className="flex flex-col gap-1.5 w-full">
    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
      {format(new Date(lastModified ?? date), 'MM.dd.')}
    </span>
    <Link
      href={`/post/${slug}`}
      className="text-lg font-medium hover:underline"
    >
      {title}
    </Link>
    <p className="text-sm text-neutral-500 dark:text-neutral-400">
      {description}
    </p>
  </div>
);

export default PostCard;
