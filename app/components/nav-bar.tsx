import NavLinks from '@/components/nav-links';
import { signOut } from '@/api/auth';
import { deleteSession } from '@/api/session';
 
export default function NavBar() {
  return (
    <div className='flex flex-row top-0 left-0 fixed text-2xl justify-around bg-orange-800 opacity-90 items-center w-full pt-[5px] pb-[5px] pl-[10px] pr-[20px]'>
      <NavLinks />
      <form
        action={async () => {
          'use server';
          await deleteSession();
          await signOut({ redirectTo: '/' });
        }}
      >
        <button className='text-base justify-center bg-transparent border-0 hover:text-orange-200 cursor-pointer'>
          <p className='mt-[2px]'>Sign Out</p>
        </button>
      </form>
    </div>
  );
}