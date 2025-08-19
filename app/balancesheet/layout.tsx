import NavBar from '../components/nav-bar'
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