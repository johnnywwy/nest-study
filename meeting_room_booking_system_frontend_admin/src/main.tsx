import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  // RouterProvider,
  // BrowserRouter,
  // Routes,
  // Route,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
// import './index.css'
// import "./reset.css";


import { Index } from './pages/Index/Index';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { UserManage } from './pages/UserManage/UserManage';
import { Login } from './pages/Login/Login';

const routes = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'user_manage',
        element: <UserManage />
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  }
];

export const router = createBrowserRouter(routes);

createRoot(document.getElementById("root") as HTMLElement)
  .render(
    <RouterProvider router={router} />
  );