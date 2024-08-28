import { Outlet } from "react-router-dom";
import { Button } from "antd";

export function Home() {
  return (
    <main>
      <Button type="primary">Button</Button>
      <span>Home</span>
      <Outlet></Outlet>
    </main>
  );
}
