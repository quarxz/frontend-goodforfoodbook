import styles from "./Home.module.css";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import { Box } from "@mui/material";
import { HomeRecipeItem } from "./HomeRecipeItem";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";

export function Home() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // console.log(location);
  console.log(user);

  const { VITE_API_URL: url } = import.meta.env;

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");
      try {
        setIsLoading(true);
        const { data, status } = await axios.get(`${url}/recipes`);
        console.log(data.recipes);
        console.log(status);
        console.log(data.message);
        setRecipes(data.recipes);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <>
      <h2>Home</h2>

      <ImageList sx={{ mt: 3 }}>
        <ImageListItem key="Subheader" cols={4}>
          <ListSubheader component="div">Recipes</ListSubheader>
        </ImageListItem>
        {recipes.map((recipe) => {
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
