import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { useSnackbar } from "notistack";

import axios from "axios";

import { RecipeDetailsContent } from "./RecipeDetailsContent";
import { RecipeBottomGallery } from "./RecipeBottomGallery";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export function RecipeDetails() {
  const [category, setCategory] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState();

  const [recipeId, setRecipeId] = useState(null);

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const matches_max_640 = useMediaQuery("(max-width:640px)");
  const matches_max_960 = useMediaQuery("(max-width:960px)");
  const matches_max_1280 = useMediaQuery("(max-width:1280px)");
  const matches_max_1920 = useMediaQuery("(max-width:1920px)");

  const { VITE_API_URL: url } = import.meta.env;

  const loadRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get(`${url}/recipes/${id}`);
      console.log(data.message, status);
      setRecipe(data.recipe);
      setCategory(data.recipe.category);
    } catch (err) {
      console.log(err);
      console.error(err.message);
      console.error(err.response.data.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    loadRecipes();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      <h1>{recipe?.name}</h1>
      <RecipeDetailsContent recipe={recipe} isloading={isloading} id={id} />
      <RecipeBottomGallery recipe={recipe} trigger={isloading} />
    </>
  );
}
