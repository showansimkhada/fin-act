'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
    class: "navbar-banner",
  },
  {
    name: 'Balance Sheet',
    href: '/balancesheet',
    class: "navbar-links",
  },
  { 
    name: 'Report', 
    href: '/report',
    class: "navbar-links",
  },
  {
    name: 'Profile',
    href: '/profile',
    class: "navbar-links",
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
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}