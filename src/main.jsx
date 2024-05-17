import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ShoppingListProvider } from "./context/ShoppingListContext";
import { UserProvider } from "./context/UserContext";
import { IngredientProvider } from "./context/IngredientContext";
import { MessageProvider } from "./context/MessageContext";

import { RootLayout } from "./components/RootLayout.jsx";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { StockList } from "./components/StockList.jsx";
import { ShoppingBasket } from "./components/ShoppingBasket.jsx";
import { ShoppingList } from "./components/ShoppingList.jsx";
import { RecipeDetails } from "./components/RecipeDetails.jsx";

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
        path: ":id",
        element: <RecipeDetails />,
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
  <ShoppingListProvider>
    <MessageProvider>
      <IngredientProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </IngredientProvider>
    </MessageProvider>
  </ShoppingListProvider>

  // </React.StrictMode>,
);
