import type { ReactNode } from 'react';

import LayoutContainer from '@/components/layout/container';

export default function MainLayout({ children }: { children: ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
