'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
    class: 'link text-base-content link-neutral text-xl font-bold no-underline'
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
            className={link.class}
          >
            <p className='hover:text-orange-200 text-base'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}