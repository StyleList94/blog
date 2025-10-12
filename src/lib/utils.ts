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

/**
 * Calculate estimated reading time for blog post content
 * @param content - Markdown content of the post
 * @returns Reading time in minutes
 */
export const calculateReadingTime = (content: string): number => {
  // Average reading speed: 200 words per minute (Korean/English mix)
  const wordsPerMinute = 200;

  // Remove markdown syntax for accurate word count
  const plainText = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove markdown headers
    .replace(/#{1,6}\s/g, '')
    // Remove markdown bold/italic
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    // Remove horizontal rules
    .replace(/---+/g, '')
    // Remove blockquotes
    .replace(/>\s/g, '');

  // Count words and characters for mixed content
  const words = plainText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Korean characters count (more accurate for Korean text)
  const koreanChars = plainText.match(/[\u3131-\uD79D]/g);
  const koreanCharCount = koreanChars ? koreanChars.length : 0;

  // Estimate total word count considering Korean characters
  // Korean: ~2 characters ≈ 1 word
  const estimatedWords = wordCount + Math.floor(koreanCharCount / 2);

  // Calculate reading time
  const readingTimeMinutes = Math.ceil(estimatedWords / wordsPerMinute);

  // Minimum 1 minute
  return Math.max(1, readingTimeMinutes);
};
