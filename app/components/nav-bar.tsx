import NavLinks from '@/components/nav-links';
import { signOut } from '@/actions/auth';
 
export default function NavBar() {
  return (
    <div className="navbar">
      <input type='checkbox' id='nav-toggle'/>
      <label htmlFor='nav-toggle' className='hamburger'>
        &#9776;
      </label>
      <NavLinks />
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button className='nav-links'>
          <div>Sign Out</div>
        </button>
      </form>
    </div>
  );
}