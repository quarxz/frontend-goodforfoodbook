import styles from "./HomeRecipeItem.module.css";

export function HomeRecipeItem({ recipe }) {
  return (
    <>
      <h2>{recipe.name}</h2>
      <h4>{recipe.categorie}</h4>
      <h4>{recipe.nutrationType}</h4>
      <h4>{recipe.recipeType}</h4>
      <h4>{recipe.rating}</h4>
    </>
  );
}
