import { Metadata } from 'next';
import NavBar from '../components/nav-bar'

export const metadata: Metadata = {
  title: "Dashboard"
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <NavBar/>
      <div className="dashboard">{children}</div>
    </div>
  );
}