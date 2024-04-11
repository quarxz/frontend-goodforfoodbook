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

const { VITE_API_URL: url } = import.meta.env;

export function RecipeBottomGallery({ recipe, trigger }) {
  const [recipesFromCategory, setRecipesFromCategory] = useState([]);
  const [recipeId, setRecipeId] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();
  console.log(id);
  console.log(recipe?.category);

  const loadAllRecipesFromCatgory = useCallback(async () => {
    console.log("Load Data");
    try {
      setIsLoading(true);
      if (recipe?.category) {
        const { data } = await axios.get(`${url}/recipes/${recipe?.category}/category`);
        console.log(data.recipe);
        setRecipesFromCategory(data.recipe);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    loadAllRecipesFromCatgory();
  }, [trigger]);

  return (
    <>
      <ImageList sx={{ mt: 0, width: "80%" }}>
        <ImageListItem key="Subheader" cols={3}></ImageListItem>
        {recipesFromCategory.map((recipe) => {
          // return <HomeRecipeItem recipe={recipe} />;
          return (
            <Link key={recipe._id} to={"/" + recipe._id}>
              <ImageListItem key={recipe._id} sx={{ m: 2 }}>
                <img src={`${recipe.thumbnail}`} alt={recipe.name} loading="lazy" />
                <ImageListItemBar id={recipe._id} title={recipe.name} subtitle={recipe.categorie} />
              </ImageListItem>
            </Link>
          );
        })}
      </ImageList>
    </>
  );
}
