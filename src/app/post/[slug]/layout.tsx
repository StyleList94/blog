import LayoutContainer from '@/components/layout/container';

export default function MainLayout({ children }: LayoutProps<'/post/[slug]'>) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
