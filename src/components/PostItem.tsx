import Link from 'next/link';
import { format } from 'date-fns';

import type { Post } from '@/types/post';

type Props = Pick<Post, 'slug' | 'title' | 'description' | 'date'>;

const PostItem = ({ slug, title, description, date }: Props) => (
  <div className="flex">
    <div>
      <div />
    </div>
    <div className="flex flex-col">
      <div className="leading-normal">
        <Link href={`/post/${slug}`} passHref>
          <span className="text-3xl hover:underline">{title}</span>
        </Link>
        <p className="mt-1">{description}</p>
      </div>
      <div className="text-right">
        <span className="text-sm">{format(new Date(date), 'yyyy-MM-dd')}</span>
      </div>
    </div>
  </div>
);

export default PostItem;
