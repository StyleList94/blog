'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-12 w-full max-w-125 h-screen mx-auto py-16 px-6 text-black dark:text-white">
      <h2 className="text-2xl">뭔가 잘못되었습니다!</h2>

      {process.env.NEXT_PUBLIC_ENV === 'dev' && (
        <div className="w-80 h-50 overflow-auto p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <p>{error.stack}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <button type="button" onClick={() => reset()} className="underline">
          다시 시도하기
        </button>
        <Link href="/" className="underline">
          메인 페이지로 이동하기
        </Link>
      </div>

      <div className="flex flex-col gap-2 select-none">
        <p className="flex items-baseline font-display text-xl">
          stylish<span className="text-lg">.log</span>
        </p>
      </div>
    </div>
  );
}
