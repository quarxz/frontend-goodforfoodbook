import { createContext, useState } from "react";

export const ShoppingListContext = createContext();

export function ShoppingListProvider({ children }) {
  const [shoppingListContext, setShoppingListContext] = useState(null);

  function addShoppingListContextIngredients(shoppingListContext) {
    setShoppingListContext(shoppingListContext);
  }
  return (
    <ShoppingListContext.Provider
      value={{ shoppingListContext, addShoppingListContextIngredients }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}
