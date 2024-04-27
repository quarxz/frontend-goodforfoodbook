import { createContext, useState } from "react";

export const IngredientContext = createContext();

export function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState(null);
  const [recipeName, setRecipeName] = useState(null);

  // console.log(ingredients);

  const addIngredients = (ingredients) => {
    setIngredients(ingredients);
  };
  const addRecipeName = (name) => {
    setRecipeName(name);
  };
  return (
    <IngredientContext.Provider value={{ ingredients, addIngredients, recipeName, addRecipeName }}>
      {children}
    </IngredientContext.Provider>
  );
}
