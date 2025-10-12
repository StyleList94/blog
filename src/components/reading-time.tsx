import { cn } from '@/lib/utils';

type Props = {
  minutes: number;
  className?: string;
};

const ReadingTime = ({ minutes, className }: Props) => (
  <div
    className={cn(
      'inline-flex items-center gap-1.5',
      'text-sm text-neutral-600 dark:text-neutral-400',
      className,
    )}
  >
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{minutes} min read</span>
  </div>
);

export default ReadingTime;
