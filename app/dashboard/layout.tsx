import { Metadata } from 'next';
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='flex flex-col content-center text-gray-900 w-[1005]'>{children}</div>
    </>
  );
}