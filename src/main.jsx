import React from "react";
import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
import { UserProvider } from "./context/UserContext";

import { RootLayout } from "./components/RootLayout.jsx";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  // </React.StrictMode>,
);
