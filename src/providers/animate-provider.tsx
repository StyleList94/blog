'use client';

import type { ReactNode } from 'react';

import { LazyMotion } from 'motion/react';

const loadFeatures = () =>
  import('@/lib/animate/features').then((res) => res.default);

const AnimateProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={loadFeatures}>{children}</LazyMotion>
);

export default AnimateProvider;
