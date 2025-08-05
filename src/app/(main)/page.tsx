import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getPostsByPage } from '@/lib/services/post';

import PostCard from '@/components/post-card';
import Pagination from '@/components/pagination';

const PAGE_SIZE = 5;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MainPage({ searchParams }: Props) {
  const { page = '1' } = await searchParams;

  try {
    const { postList } = await getPostsByPage({
      page,
      limit: PAGE_SIZE,
    });

    const currentPage = +page;

    return (
      <>
        {postList.length > 0 && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 w-full">
              {postList.map((post) => (
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
            <div className="flex justify-end w-full">
              <Pagination currentPage={currentPage} />
            </div>
          </div>
        )}

        {postList.length === 0 && (
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
        )}
      </>
    );
  } catch {
    redirect('/');
  }
}
