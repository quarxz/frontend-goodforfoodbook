import styles from "./RecipeDetails.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { RecipeContent } from "./RecipeContent";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import { RecipeBottomGallery } from "./RecipeBottomGallery";

export function RecipeDetails() {
  const [category, setCategory] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState();

  const { user } = useContext(UserContext);

  const { VITE_API_URL: url } = import.meta.env;

  const loadRecipes = useCallback(async () => {
    console.log("load Data");
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/recipes/${id}`);
      console.log(data.recipe);

      // console.log(status);
      console.log(data.message);
      setRecipe(data.recipe);
      setCategory(data.recipe.category);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <>
      <h2>Recipe Details</h2>
      <RecipeContent recipe={recipe} isloading={isloading} id={id} />
      <RecipeBottomGallery recipe={recipe} trigger={isloading} />
    </>
  );
}
