import { cn, sleep } from '@/lib/utils';

describe('utils', () => {
  describe('cn utility function', () => {
    it('merges class names correctly', () => {
      const result = cn('btn', 'btn-primary');
      expect(result).toBe('btn btn-primary');
    });

    it('handles conditional class names correctly', () => {
      const isTrue = true;
      const result = cn(
        'btn',
        isTrue && 'btn-primary',
        !isTrue && 'btn-secondary',
      );
      expect(result).toBe('btn btn-primary');
    });

    it('removes duplicate class names using tailwind-merge', () => {
      const result = cn('p-4', 'p-2');
      expect(result).toBe('p-2'); // tailwind-merge should keep only the last class
    });

    it('handles empty and undefined values correctly', () => {
      const result = cn('btn', undefined, null, '', 'btn-primary');
      expect(result).toBe('btn btn-primary');
    });

    it('merges array and object syntax correctly', () => {
      const result = cn([
        'btn',
        { 'btn-primary': true, 'btn-secondary': false },
      ]);
      expect(result).toBe('btn btn-primary');
    });

    it('returns an empty string if no valid class names are provided', () => {
      const result = cn(undefined, null, false, '');
      expect(result).toBe('');
    });
  });

  describe('sleep', () => {
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
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), ms);

      vi.advanceTimersByTime(ms);

      await expect(sleepPromise).resolves.toBeUndefined();
    });
  });
});
