import NavLinks from '@/components/navLinks';
import { signOut } from '@/api/auth';
import { deleteSession } from '@/api/session';
 
export default function NavBar() {
  return (
    <div className='navBar'>
      <div className='navWidth'>
        <NavLinks />
        <form
          action={async () => {
            'use server';
            await deleteSession();
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className='signOutBtn'>
            <p>Sign Out</p>
          </button>
        </form>
      </div>
    </div>
  );
}