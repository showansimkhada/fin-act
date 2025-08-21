import { Metadata } from "next";
import NavBar from '@/components/nav-bar'

export const metadata: Metadata = {
  title: "Balancesheet"
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="">
        <NavBar/>
      </div>
      <div className="">{children}</div>
    </div>
  );
}