import { Metadata } from 'next';
import NavBar from '@/components/navBar'

export const metadata: Metadata = {
  title: 'Report'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}