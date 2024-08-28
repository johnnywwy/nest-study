import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <main>
      <span>Home</span>
      <Outlet></Outlet>
    </main>
  );
}
