import { Metadata } from 'next';
import NavBar from '@/components/navBar'

export const metadata: Metadata = {
  title: 'Balance Sheet'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='main'>{children}</div>
    </>
  );
}