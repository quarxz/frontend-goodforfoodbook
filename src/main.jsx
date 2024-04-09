import React from "react";
import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

import { RootLayout } from "./components/RootLayout.jsx";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { StockList } from "./components/StockList.jsx";
import { ShoppingBasket } from "./components/ShoppingBasket.jsx";
import { ShoppingList } from "./components/ShoppingList.jsx";

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
        path: "stocklist",
        element: <StockList />,
      },
      {
        path: "shoppinglist",
        element: <ShoppingList />,
      },
      {
        path: "shoppingbasket",
        element: <ShoppingBasket />,
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
