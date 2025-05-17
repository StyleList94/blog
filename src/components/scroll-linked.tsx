'use client';

import { type ReactNode } from 'react';
import { LazyMotion, domAnimation, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';

type Props = {
  children: ReactNode;
};

const ScrollLinked = ({ children }: Props) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        id="scroll-indicator"
        style={{
          scaleX,
          position: 'fixed',
          originX: 0,
        }}
        className="fixed top-0 left-0 right-0 bottom-0 h-1 z-20 bg-teal-400 dark:bg-sky-200"
      />
      {children}
    </LazyMotion>
  );
};

export default ScrollLinked;
