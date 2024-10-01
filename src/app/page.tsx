import { getAllPosts } from '@/lib/services/api/post';

import type { Post } from '@/types/post';

import PostItem from '@/components/post-item';
import LayoutContainer from '@/components/layout-container';

export default async function MainPage() {
  const postList: Omit<Post, 'content'>[] = getAllPosts();

  return (
    <LayoutContainer>
      <div className="flex flex-col justify-center items-center gap-8 p-8 ">
        {postList.map((post) => (
          <PostItem
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
          />
        ))}
      </div>
    </LayoutContainer>
  );
}
