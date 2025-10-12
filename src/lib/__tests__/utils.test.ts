import {
  calculateReadingTime,
  cn,
  getUpdatedDateByPost,
  sleep,
} from '../utils';

describe('cn()', () => {
  it('merges class names correctly', () => {
    const result = cn('btn', 'btn-primary');
    expect(result).toBe('btn btn-primary');
  });

  it('handles conditional class names correctly', () => {
    const isTrue = typeof 'lovely' === 'string';

    const result = cn(
      'btn',
      isTrue && 'btn-primary',
      !isTrue && 'btn-secondary',
    );
    expect(result).toBe('btn btn-primary');
  });

  it('removes duplicate class names using tailwind-merge', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('handles empty and undefined values correctly', () => {
    const result = cn('btn', undefined, null, '', 'btn-primary');
    expect(result).toBe('btn btn-primary');
  });

  it('merges array and object syntax correctly', () => {
    const result = cn(['btn', { 'btn-primary': true, 'btn-secondary': false }]);
    expect(result).toBe('btn btn-primary');
  });

  it('returns an empty string if no valid class names are provided', () => {
    const result = cn(undefined, null, false, '');
    expect(result).toBe('');
  });
});

describe('sleep()', () => {
  vi.useFakeTimers();

  beforeAll(() => {
    vi.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('waits for the specified amount of time', async () => {
    const ms = 1000;

    const sleepPromise = sleep(ms);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledExactlyOnceWith(
      expect.any(Function),
      ms,
    );

    vi.advanceTimersByTime(ms);

    await expect(sleepPromise).resolves.toBeUndefined();
  });
});

describe('getUpdatedDateByPost()', () => {
  const mockPost = {
    slug: 'survive-in-front-end',
    title: '프론트엔드로 살아남기',
    description: '사용자 경험이 중요할까? 성능이 중요할까?',
    date: '2025-08-05T05:30:00.000Z',
    content: '',
  };

  it('returns date if last modified date is undefined', () => {
    expect(getUpdatedDateByPost(mockPost)).toBe('2025-08-05T05:30:00.000Z');
  });

  it('returns last modified date', () => {
    const updatedPost = {
      ...mockPost,
      lastModified: '2025-08-05T15:30:00.000Z',
    };

    expect(getUpdatedDateByPost(updatedPost)).toBe('2025-08-05T15:30:00.000Z');
  });
});

describe('calculateReadingTime()', () => {
  it('calculates reading time for English content', () => {
    const content = 'word '.repeat(200);
    expect(calculateReadingTime(content)).toBe(1);
  });

  it('calculates reading time for Korean content', () => {
    const koreanContent = '안녕하세요 '.repeat(100);
    const result = calculateReadingTime(koreanContent);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(3);
  });

  it('removes markdown syntax before counting', () => {
    const readableContent = 'word '.repeat(200);

    const withMarkdown = `# Title
**${readableContent}**
\`\`\`js
// This entire code block has many words but should be completely ignored
${'ignored '.repeat(500)}
\`\`\`
*more text here*`;

    const plainResult = calculateReadingTime(readableContent);
    expect(plainResult).toBe(1);

    const markdownResult = calculateReadingTime(withMarkdown);
    expect(markdownResult).toBe(2);

    expect(markdownResult).not.toBeGreaterThanOrEqual(4);
  });

  it('returns minimum 1 minute for very short content', () => {
    expect(calculateReadingTime('Short')).toBe(1);
    expect(calculateReadingTime('')).toBe(1);
  });

  it('calculates correct time for mixed Korean/English content', () => {
    const mixedContent = 'Hello 안녕하세요 '.repeat(100);
    const result = calculateReadingTime(mixedContent);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(10);
  });

  it('handles long content correctly', () => {
    const longContent = 'word '.repeat(1000);
    expect(calculateReadingTime(longContent)).toBe(5);
  });
});
