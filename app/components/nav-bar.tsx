import NavLinks from '@/components/nav-links';
import { signOut } from '@/actions/auth';
 
export default function NavBar() {
  return (
    <div className='flex flex-row top-0 left-0 fixed text-2xl justify-around items-center shadow-sm w-full'>
      {/* <input type='checkbox' id='nav-toggle'/>
      <label htmlFor='nav-toggle' className='hamburger'>
        &#9776;
      </label> */}
      <NavLinks />
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button className='text-base justify-center bg-transparent border-0 hover:text-orange-200 cursor-pointer'>
          <div>Sign Out</div>
        </button>
      </form>
    </div>
  );
}