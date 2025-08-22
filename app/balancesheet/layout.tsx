import { Metadata } from 'next';
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: 'Balancesheet'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <div className='flex flex-col pt-[25px] pl-[10px] pr-[10px] w-screen h-screen mt-[40px]'>{children}</div>
    </>
  );
}