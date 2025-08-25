'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
  },
  {
    name: 'Balance Sheet',
    href: '/balancesheet',
  },
  { 
    name: 'Report', 
    href: '/report',
  },
  {
    name: 'Profile',
    href: '/profile',
  },
];
 
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className='active:outline-black'
          >
            <p className='hover:text-orange-200 text-base'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}