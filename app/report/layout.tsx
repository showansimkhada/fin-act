import { Metadata } from 'next';
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Report'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div>{children}</div>
    </>
  );
}