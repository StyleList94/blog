import type { Post } from '@/types/post';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getUpdatedDateByPost = (post: Omit<Post, 'content'>): string =>
  post.lastModified ?? post.date;
