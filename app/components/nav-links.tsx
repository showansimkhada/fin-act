'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
    class: "navbar-banner",
    icon: HomeIcon 
  },
  {
    name: 'Balance Sheet',
    href: '/balancesheet',
    class: "navbar-links",
    icon: DocumentDuplicateIcon,
  },
  { 
    name: 'Report', 
    href: '/report',
    class: "navbar-links",
    icon: UserGroupIcon 
  },
  {
    name: 'Profile',
    href: '/profile',
    class: "navbar-links",
    icon: UserIcon
  },
];
 
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
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