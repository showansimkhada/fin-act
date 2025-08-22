import { Metadata } from 'next';
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='flex flex-col p-0.5 w-screen h-screen content-center text-gray-900 mt-[90px]'>{children}</div>
    </>
  );
}