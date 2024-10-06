import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 w-full max-w-[500px] h-screen mx-auto py-16 px-6 text-black dark:text-white">
      <h2 className="text-2xl">404 :: 페이지를 찾을 수 없습니다!</h2>

      <div className="flex flex-col gap-4">
        <Link href="/" className="underline">
          메인 페이지로 이동하기
        </Link>
      </div>

      <div className="flex flex-col gap-2 select-none">
        <p className="flex items-end gap-0.5 font-display text-xl tracking-wide">
          STYLISH
          <span className="text-sm leading-relaxed tracking-wider">.LOG</span>
        </p>
      </div>
    </div>
  );
}
