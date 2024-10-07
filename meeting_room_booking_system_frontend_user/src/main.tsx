import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  // RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

// import App from "./App.tsx";
// import "./reset.css";

import { ErrorPage } from "./views/Error/ErrorPage.tsx";
import { Home } from "./views/Home/Home.tsx";
import { UserManage } from "./views/User/UserManage.tsx";
import { Login } from "./views/Login/Login.tsx";
import { Menu } from "./views/Menu/Menu.tsx";
import { ModifyMenu } from "./views/ModifyMenu/ModifyMenu.tsx";
import { InfoModify } from "./views/InfoModify/InfoModify.tsx";
import { PasswordModify } from "./views/PasswordModify/PasswordModify.tsx";
import { Register } from "./views/Register/register.tsx";
import { UpdatePassword } from "./views/Update_password/UpdatePassword.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu />,
        children: [
          {
            path: "user_manage",
            element: <UserManage />,
          },
        ],
      },
      {
        path: "/user",
        element: <ModifyMenu />,
        children: [
          {
            path: "info_modify",
            element: <InfoModify />,
          },
          {
            path: "password_modify",
            element: <PasswordModify />,
          },
        ],
      },
      // {
      //   path: "user_manage",
      //   element: <UserManage />,
      // },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];

export const router = createBrowserRouter(routes);

createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);

// root.render(<RouterProvider router={router} />);
