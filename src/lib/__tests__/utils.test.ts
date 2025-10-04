import { cn, getUpdatedDateByPost, sleep } from '../utils';

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
