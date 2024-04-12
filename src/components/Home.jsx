import styles from "./Home.module.css";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import { Box, Stack } from "@mui/material";

import { RecipesFilter } from "./RecipesFilter";
import { HomeRecipeItem } from "./HomeRecipeItem";

import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";

export function Home() {
  const theme = useTheme();
  const location = useLocation();
  const [filterNutrationType, setFilterNutrationType] = useState({ name: "", type: "" });
  const [filterRecipeType, setFilterRecipeType] = useState({ name: [], type: "" });
  const [recipes, setRecipes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { user } = useContext(UserContext);

  const matches_max_640 = useMediaQuery("(max-width:640px)");
  const matches_max_960 = useMediaQuery("(max-width:960px)");
  const matches_max_1280 = useMediaQuery("(max-width:1280px)");
  const matches_max_1920 = useMediaQuery("(max-width:1920px)");

  const matchDownXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  console.log("matchDownXS:", matchDownXS);
  console.log("matchDownSM:", matchDownSM);
  console.log("matchDownMD:", matchDownMD);
  console.log("matchDownLG:", matchDownLG);
  console.log("matchDownXL:", matchDownXL);

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
          {/* <LinearProgress /> */}
          <Stack spacing={2}>
            <Skeleton variant="rectangular" animation="wave" width="100%" height={20} />
            <Skeleton variant="rectangular" animation="wave" width="100%" height={20} />
            <Skeleton variant="rectangular" animation="wave" width="100%" height={20} />
          </Stack>
        </Box>
      ) : (
        <ImageList
          cols={
            matches_max_640
              ? 2
              : matches_max_960
              ? 2
              : matches_max_1280
              ? 3
              : matches_max_1920
              ? 4
              : 5
          }
          // cols={matches_min_960 ? 4 : matches_min_960 ? 3 : matches_min_640 ? 2 : 1}
          sx={{ mt: 3, width: "100%" }}
        >
          <ImageListItem
            key="Subheader"
            cols={
              matches_max_640
                ? 2
                : matches_max_960
                ? 2
                : matches_max_1280
                ? 3
                : matches_max_1920
                ? 4
                : 5
            }
          ></ImageListItem>
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
