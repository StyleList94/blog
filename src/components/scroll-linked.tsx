'use client';

import { useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';

const ScrollLinked = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
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
