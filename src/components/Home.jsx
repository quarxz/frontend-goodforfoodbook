import styles from "./Home.module.css";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import { Box } from "@mui/material";

import { RecipesFilter } from "./RecipesFilter";
import { HomeRecipeItem } from "./HomeRecipeItem";

import LinearProgress from "@mui/material/LinearProgress";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";

export function Home() {
  const location = useLocation();
  const [filterNutrationType, setFilterNutrationType] = useState({ name: "", type: "" });
  const [filterRecipeType, setFilterRecipeType] = useState({ name: [], type: "" });
  const [recipes, setRecipes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { user } = useContext(UserContext);

  // console.log(location);
  // console.log(user);

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

  const handleFilter = (e, isActive) => {
    const id = e.target.id;

    if (id === "vegetarisch") {
      setFilterNutrationType({ name: id, type: "nutrationType" });
      if (id === "vegetarisch" && filterNutrationType.name != "") {
        setFilterNutrationType({ name: "", type: "" });
      }
    }
    if (id === "einfach" || id === "schnell") {
      setFilterRecipeType({ name: id, type: "recipeType" });
      if (
        (id === "einfach" && filterRecipeType.name != "") ||
        (id === "schnell" && filterRecipeType.name != "")
      ) {
        setFilterRecipeType({ name: "", type: "" });
      }
    }

    if (id === "schnell") {
    }
  };

  return (
    <>
      <RecipesFilter
        onClickFilter={(e, isActive) => {
          handleFilter(e, isActive);
        }}
      />

      <h2>Home</h2>

      {isloading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <ImageList sx={{ mt: 3, width: "100%" }}>
          <ImageListItem key="Subheader" cols={4}></ImageListItem>
          {recipes
            .filter((recipes) => {
              if (
                filterNutrationType.type === "nutrationType" &&
                filterNutrationType.name === recipes.nutrationType
              ) {
                return true;
              }
              if (
                filterRecipeType.type === "recipeType" &&
                filterRecipeType.name === recipes.recipeType
              ) {
                return true;
              }
              if (filterNutrationType.name === "" || filterRecipeType.name === "") {
                return true;
              }
            })
            .map((recipe) => {
              // return <HomeRecipeItem recipe={recipe} />;
              return (
                <Link key={recipe._id} to={"/" + recipe._id}>
                  <ImageListItem key={recipe._id} sx={{ m: 2 }}>
                    <img src={`${recipe.thumbnail}`} alt={recipe.name} loading="lazy" />
                    <ImageListItemBar
                      id={recipe._id}
                      title={recipe.name}
                      subtitle={recipe.categorie}
                    />
                  </ImageListItem>
                </Link>
              );
            })}
        </ImageList>
      )}
    </>
  );
}
