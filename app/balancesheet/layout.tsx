import { Metadata } from 'next';
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Balancesheet'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='flex flex-col overflow-scroll w-[1005]'>{children}</div>
    </>
  );
}