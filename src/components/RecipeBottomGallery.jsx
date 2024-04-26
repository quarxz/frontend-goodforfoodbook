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

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";

const { VITE_API_URL: url } = import.meta.env;

export function RecipeBottomGallery({ recipe, trigger }) {
  const [recipesFromCategory, setRecipesFromCategory] = useState([]);
  const [recipeId, setRecipeId] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();
  const theme = useTheme();

  const loadAllRecipesFromCatgory = useCallback(async () => {
    try {
      setIsLoading(true);
      if (recipe?.category) {
        const { data } = await axios.get(`${url}/recipes/${recipe?.category}/category`);
        // console.log(data.recipe);
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

  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      <ImageList
        cols={xs ? 2 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5}
        // cols={matches_min_960 ? 4 : matches_min_960 ? 3 : matches_min_640 ? 2 : 1}
        sx={{ mt: 3, width: "100%" }}
      >
        <ImageListItem
          key="Subheader"
          cols={xs ? 2 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5}
        ></ImageListItem>
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
