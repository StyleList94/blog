import type { ReactNode } from 'react';

import LayoutContainer from '@/components/layout/container';

export default function PostLayout({ children }: { children: ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
