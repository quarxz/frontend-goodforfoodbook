import styles from "./Home.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import { SelectBoxCategory } from "./SelectBoxCategory";

import axios from "axios";
import { Box, Button, Fab, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { RecipesFilter } from "./RecipesFilter";
import { HomeRecipeItem } from "./HomeRecipeItem";

import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { Category } from "@mui/icons-material";
import { SelectBoxRecipeType } from "./SelectBoxRecipeType";
import { SelectBoxNutrationType } from "./SelectBoxNutrationType";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ClearIcon from "@mui/icons-material/Clear";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";

export function Home() {
  const [recipes, setRecipes] = useState([]);
  const [usersRecipesList, setUsersRecipesList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { user } = useContext(UserContext);
  const { addShoppingListContextIngredients } = useContext(ShoppingListContext);
  const theme = useTheme();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { VITE_API_URL: url } = import.meta.env;

  // const matches_max_640 = useMediaQuery("(max-width:640px)");
  // const matches_max_960 = useMediaQuery("(max-width:960px)");
  // const matches_max_1280 = useMediaQuery("(max-width:1280px)");
  // const matches_max_1920 = useMediaQuery("(max-width:1920px)");

  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  const loadIngredientsFromShoppingList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get(
        `${url}/users/${user?.id}/getIngredientsFromShoppingList`
      );
      console.log(data.message, status);
      user && enqueueSnackbar(data.message, { variant: "success" });
      addShoppingListContextIngredients(data.shoppingList.length);
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message);
      console.error(err.response.status);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user?.id]);

  useEffect(() => {
    loadIngredientsFromShoppingList();
  }, [url, user?.id, loadIngredientsFromShoppingList]);

  const loadRecipesFromUserRecipesList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get(
        `${url}/users/${user?.id}/getRecipesFromUserRecipes`
      );
      console.log(data.message, status);
      user && enqueueSnackbar(data.message, { variant: "success" });
      setUsersRecipesList(data.recipes);
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message);
      console.error(err.response.status);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user?.id]);

  useEffect(() => {
    loadRecipesFromUserRecipesList();
  }, [url, user?.id, loadRecipesFromUserRecipesList]);

  const loadRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get(`${url}/recipes`);
      console.log(data.message, status);
      user && enqueueSnackbar(data.message, { variant: "success" });
      setRecipes(data.recipes);
    } catch (err) {
      console.log(err);
      console.error(err.message);
      console.error(err.message.data.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user?.id]);
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const [filterNutrationType, setFilterNutrationType] = useState({ name: "", type: "" });
  const [filterRecipeTypeEasy, setFilterRecipeTypeEasy] = useState({ name: "", type: "" });
  const [filterRecipeTypeFast, setFilterRecipeTypeFast] = useState({ name: "", type: "" });

  const [filterCategory, setFilterCategory] = useState([]);
  const [filterRecipeType, setFilterRecipeType] = useState([]);
  const [filterNutrationTypeX, setFilterNutrationTypeX] = useState([]);

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;

    setFilterCategory(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeRecipeType = (event) => {
    const {
      target: { value },
    } = event;

    setFilterRecipeType(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeNutrationType = (event) => {
    const {
      target: { value },
    } = event;

    setFilterNutrationTypeX(typeof value === "string" ? value.split(",") : value);
  };

  const handleClearAllFilter = () => {
    setFilterCategory([]);
    setFilterRecipeType([]);
    setFilterNutrationTypeX([]);
  };

  const handleFilter = (e) => {
    const filter = e.target.id;

    if (filter === "vegetarisch") {
      setFilterNutrationType({ name: filter, type: "nutrationType" });
      if (filterNutrationType.name === "vegetarisch") {
        setFilterNutrationType({ name: "", type: "" });
      }
    }
    if (filter === "einfach") {
      const obj1 = { name: filter, type: "recipeType" };
      setFilterRecipeTypeEasy(obj1);
      if (filterRecipeTypeEasy.name === "einfach") {
        setFilterRecipeTypeEasy({ name: "", type: "" });
      }
    }
    if (filter === "schnell") {
      const obj2 = { name: filter, type: "recipeType" };
      setFilterRecipeTypeFast(obj2);
      if (filterRecipeTypeFast.name === "schnell") {
        setFilterRecipeTypeFast({ name: "", type: "" });
      }
    }
  };

  return (
    <Grid container>
      <Grid container spacing={3} sx={{ padding: "2em 0 2em 0" }}>
        <SelectBoxRecipeType
          onhandleChangeRecipeType={(e) => {
            handleChangeRecipeType(e);
          }}
          filterRecipeType={filterRecipeType}
        />
        <SelectBoxCategory
          onhandleChangeCategory={(e) => {
            handleChangeCategory(e);
          }}
          filterCategory={filterCategory}
        />
        <SelectBoxNutrationType
          onhandleChangeNutrationType={(e) => {
            handleChangeNutrationType(e);
          }}
          filterNutrationTypeX={filterNutrationTypeX}
        />
        {filterRecipeType.length || filterCategory.length || filterNutrationTypeX.length ? (
          <Grid p={1} ml={3} mr={1}>
            <Tooltip
              title="Auswahl löschen"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 700 }}
              placement="top"
            >
              <Fab
                onClick={handleClearAllFilter}
                aria-label="delete"
                sx={{
                  "&:hover": {
                    bgcolor: red[600],
                  },
                }}
              >
                <ClearIcon />
              </Fab>
            </Tooltip>
          </Grid>
        ) : (
          <Grid></Grid>
        )}
        <RecipesFilter
          onClickFilter={(e) => {
            handleFilter(e);
          }}
        />
      </Grid>

      <Grid container spacing={3}>
        <h2>Rezepte die glücklich machen ...</h2>

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
            cols={xs ? 2 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5}
            // cols={matches_min_960 ? 4 : matches_min_960 ? 3 : matches_min_640 ? 2 : 1}
            sx={{ mt: 3, width: "100%" }}
          >
            <ImageListItem
              key="Subheader"
              cols={xs ? 2 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5}
            ></ImageListItem>
            {recipes
              .filter((recipes) => {
                const isType = filterRecipeType.includes(recipes.recipeType);
                if (filterRecipeType.length === 0) {
                  return true;
                }
                if (isType && filterRecipeType.length !== 0) {
                  if (!isType) {
                    return false;
                  }
                  return true;
                }
              })
              .filter((recipes) => {
                const isType = filterNutrationTypeX.includes(recipes.nutrationType);
                if (filterNutrationTypeX.length === 0) {
                  return true;
                }
                if (isType && filterNutrationTypeX.length !== 0) {
                  if (!isType) {
                    return false;
                  }
                  return true;
                }
              })
              .filter((recipes) => {
                const isType = filterCategory.includes(recipes.category.name);
                if (filterCategory.length === 0) {
                  return true;
                }
                if (isType && filterCategory.length !== 0) {
                  if (!isType) {
                    return false;
                  }
                  return true;
                }
              })

              .filter((recipes) => {
                if (
                  (filterNutrationType.type === "nutrationType" &&
                    filterNutrationType.name === recipes.nutrationType) ||
                  (filterRecipeTypeEasy.type === "recipeType" &&
                    filterRecipeTypeEasy.name === recipes.recipeType) ||
                  (filterRecipeTypeFast.type === "recipeType" &&
                    filterRecipeTypeFast.name === recipes.recipeType)
                ) {
                  return true;
                }
                if (
                  filterNutrationType.name !== "" ||
                  filterRecipeTypeEasy.name !== "" ||
                  filterRecipeTypeFast.name !== ""
                ) {
                  return false;
                }

                return true;
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
                        subtitle={recipe.category.name}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${recipe.name}`}
                          >
                            <ArrowCircleRightIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  </Link>
                );
              })}
          </ImageList>
        )}
      </Grid>
      {user ? (
        <Grid container spacing={3} sx={{ padding: "2em 0 2em 0" }}>
          <h2>Deine Auswahl an Rezepten ...</h2>
          <ImageList
            cols={xs ? 2 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5}
            // cols={matches_min_960 ? 4 : matches_min_960 ? 3 : matches_min_640 ? 2 : 1}
            sx={{ mt: 3, width: "100%" }}
          >
            <ImageListItem
              key="Subheader"
              cols={xs ? 2 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5}
            ></ImageListItem>
            {usersRecipesList.map((recipe) => {
              return (
                <Link key={recipe._id} to={"/" + recipe._id}>
                  <ImageListItem key={recipe._id} sx={{ m: 2 }}>
                    <img src={`${recipe.thumbnail}`} alt={recipe.name} loading="lazy" width={50} />

                    <ImageListItemBar
                      id={recipe._id}
                      title={recipe.name}
                      subtitle={recipe.category.name}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${recipe.name}`}
                        >
                          <ArrowCircleRightIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                </Link>
              );
            })}
          </ImageList>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}
