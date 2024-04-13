import { createContext, useState } from "react";

export const IngredientContext = createContext();

export function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState(null);

  console.log(ingredients);

  function addIngredients(ingredients) {
    setIngredients(ingredients);
  }
  return (
    <IngredientContext.Provider value={{ ingredients, addIngredients }}>
      {children}
    </IngredientContext.Provider>
  );
}
