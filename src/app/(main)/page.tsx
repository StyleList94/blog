import Link from 'next/link';

import { getAllPosts } from '@/lib/services/post';
import { groupPostsByYear } from '@/lib/post-utils';

import PostCard from '@/components/post-card';

export default async function MainPage() {
  const posts = await getAllPosts();
  const groups = groupPostsByYear(posts);

  if (groups.length === 0)
    return (
      <div className="flex flex-col justify-center items-center flex-1 gap-10 w-full">
        <div className="text-rose-500 dark:text-pink-600 text-6xl md:text-8xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-rocket-icon lucide-rocket"
            aria-label="rocket-icon"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p>이 페이지가 만들어질 수 있도록</p>
          <p>필력을 최대한 끌어 올리겠습니다!</p>
        </div>
        <Link href="/" className="underline">
          첫 페이지로 날아가기
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-12 w-full">
      {groups.map(({ year, posts: yearPosts }) => (
        <section
          key={year}
          aria-labelledby={`year-${year}`}
          className="flex flex-col gap-4"
        >
          <h2
            id={`year-${year}`}
            className="font-sans tracking-tight text-base sm:text-lg text-neutral-400 dark:text-neutral-500 select-none"
          >
            {year}
          </h2>
          <div className="flex flex-col gap-8 w-full">
            {yearPosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                lastModified={post.lastModified}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
