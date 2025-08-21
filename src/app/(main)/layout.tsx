import LayoutContainer from '@/components/layout/container';

export default function MainLayout({ children }: LayoutProps<'/'>) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
