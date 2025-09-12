import NavLinks from '@/components/nav-links';
import { signOut } from '@/api/auth';
import { deleteSession } from '@/api/session';
 
export default function NavBar() {
  return (
    <div className=''>
      <NavLinks />
      <form
        action={async () => {
          'use server';
          await deleteSession();
          await signOut({ redirectTo: '/' });
        }}
      >
        <button className=''>
          <p className=''>Sign Out</p>
        </button>
      </form>
    </div>
  );
}