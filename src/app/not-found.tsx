import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 w-full max-w-125 h-screen mx-auto py-16 px-6 text-black dark:text-white">
      <div className="flex flex-col items-center gap-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={96}
          height={96}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-slash-icon lucide-circle-slash"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="9" x2="15" y1="15" y2="9" />
        </svg>
        <h2 className="text-lg">404</h2>
        <h3 className="text-2xl">Not Found</h3>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/" className="underline">
          메인 페이지로 이동하기
        </Link>
      </div>

      <div className="flex flex-col gap-2 select-none">
        <p className="flex items-baseline font-display text-xl tracking-wider">
          stylish
          <span className="text-sm">.log</span>
        </p>
      </div>
    </div>
  );
}
