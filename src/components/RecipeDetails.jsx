import styles from "./RecipeDetails.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import { SnackbarProvider, useSnackbar } from "notistack";

import axios from "axios";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { RecipeContent } from "./RecipeContent";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import { RecipeBottomGallery } from "./RecipeBottomGallery";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";

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

  // const matchDownXS = useMediaQuery(theme.breakpoints.down("xs"));
  // const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  // const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  // const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  // const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  // console.log("matchDownXS:", matchDownXS);
  // console.log("matchDownSM:", matchDownSM);
  // console.log("matchDownMD:", matchDownMD);
  // console.log("matchDownLG:", matchDownLG);
  // console.log("matchDownXL:", matchDownXL);

  const { VITE_API_URL: url } = import.meta.env;

  const loadRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/recipes/${id}`);
      // const { data: ingredients } = await axios.get(
      //   `${url}/recipes/${id}/getIngredientsFromRecipe`
      // );
      console.log(data.recipe);
      // console.log(data.ingredients);
      // setIngredients(ingredients.ingredients);

      // console.log(status);
      console.log(data.message);

      enqueueSnackbar(data.message, { variant: "info" });
      setRecipe(data.recipe);
      setCategory(data.recipe.category);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
      enqueueSnackbar(err.response.data.message, { variant: "error" });
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
      <h2>Recipe Details</h2>
      <RecipeContent recipe={recipe} isloading={isloading} id={id} />
      <RecipeBottomGallery recipe={recipe} trigger={isloading} />
    </>
  );
}
