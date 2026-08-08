'use client';

import { useEffect, useState } from 'react';

import { useMotionValue, useSpring } from 'motion/react';
import { div as MotionDiv } from 'motion/react-m';

const getScrollProgress = () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  return scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
};

const ScrollLinked = () => {
  // Seed the initial value during render. Setting it from an effect is lost
  // while LazyMotion still loads its features, which leaves the bar at 0 after
  // a reload restores the scroll position.
  const [initialProgress] = useState(() =>
    typeof window === 'undefined' ? 0 : getScrollProgress(),
  );
  const scrollProgress = useMotionValue(initialProgress);
  const scaleX = useSpring(scrollProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const update = () => scrollProgress.set(getScrollProgress());

    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollProgress]);

  return (
    <MotionDiv
      id="scroll-indicator"
      style={{
        scaleX,
        position: 'fixed',
        originX: 0,
      }}
      className="fixed top-0 left-0 right-0 bottom-0 h-1 z-20 bg-teal-400 dark:bg-sky-200"
    />
  );
};

export default ScrollLinked;
