'use client';

import { useEffect, useState } from 'react';

import { useMounted } from '@stylelist94/nine-beauty-actress';
import { useMotionValue, useSpring } from 'motion/react';
import { div as MotionDiv } from 'motion/react-m';

const getScrollableHeight = () =>
  document.documentElement.scrollHeight - window.innerHeight;

const getScrollProgress = (scrollableHeight: number) =>
  scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

const ScrollLinked = () => {
  // Seed the initial value during render. Setting it from an effect is lost
  // while LazyMotion still loads its features, which leaves the bar at 0 after
  // a reload restores the scroll position.
  const [initialProgress] = useState(() =>
    typeof window === 'undefined'
      ? 0
      : getScrollProgress(getScrollableHeight()),
  );
  const isMounted = useMounted();
  const scrollProgress = useMotionValue(initialProgress);
  const scaleX = useSpring(scrollProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let scrollableHeight = getScrollableHeight();

    const update = () =>
      scrollProgress.set(getScrollProgress(scrollableHeight));

    const observer = new ResizeObserver(() => {
      scrollableHeight = getScrollableHeight();
      update();
    });
    observer.observe(document.documentElement);

    window.addEventListener('scroll', update, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [scrollProgress]);

  return (
    <MotionDiv
      id="scroll-indicator"
      // The server cannot know the visitor's scroll position, so the seeded
      // value never matches the server-rendered one
      suppressHydrationWarning
      style={{
        scaleX,
        position: 'fixed',
        originX: 0,
        opacity: isMounted ? 1 : 0,
      }}
      className="fixed top-0 left-0 right-0 bottom-0 h-1 z-20 bg-teal-400 dark:bg-sky-200 transition-opacity duration-300"
    />
  );
};

export default ScrollLinked;
