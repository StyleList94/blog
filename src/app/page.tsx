import { cn } from '@/lib/utils';
import { getAllPosts } from '@/lib/services/post';

import type { Post } from '@/types/post';

import PostCard from '@/components/post-card';
import LayoutContainer from '@/components/layout/container';

export default async function MainPage() {
  const postList: Omit<Post, 'content'>[] = await getAllPosts();

  return (
    <LayoutContainer>
      <div className={cn('flex flex-col gap-5 w-full', 'lg:flex-row lg:gap-0')}>
        <div className="flex flex-col flex-1 gap-3">
          <div className={cn('flex flex-col')}>
            {postList.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
