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
import "./index.css";

import { ErrorPage } from "./views/Error/ErrorPage.tsx";
import { Home } from "./views/Home/Home.tsx";
import { UserManage } from "./views/User/UserManage.tsx";
import { Login } from "./views/Login/Login.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user_manage",
        element: <UserManage />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);

// root.render(<RouterProvider router={router} />);
