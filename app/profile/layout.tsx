import { Metadata } from 'next';
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Profile'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='flex flex-col justify-between w-[1005]'>{children}</div>
    </>
  );
}