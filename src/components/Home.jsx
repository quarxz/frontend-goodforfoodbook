import styles from "./Home.module.css";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import { SelectBoxCategory } from "./SelectBoxCategory";

import axios from "axios";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

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
import { Category } from "@mui/icons-material";
import { SelectBoxRecipeType } from "./SelectBoxRecipeType";
import { SelectBoxNutrationType } from "./SelectBoxNutrationType";

export function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { user } = useContext(UserContext);
  const theme = useTheme();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

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

  // console.log(location);
  // console.log(user);

  const { VITE_API_URL: url } = import.meta.env;

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const { data, status } = await axios.get(`${url}/recipes`);
        console.log(data.recipes);
        console.log(status);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "info" });
        setRecipes(data.recipes);
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

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

  const handleFilter = (e) => {
    const filter = e.target.id;

    if (filter === "vegetarisch") {
      console.log(filter);
      setFilterNutrationType({ name: filter, type: "nutrationType" });
      if (filterNutrationType.name === "vegetarisch") {
        setFilterNutrationType({ name: "", type: "" });
      }
    }
    if (filter === "einfach") {
      console.log(filter);
      const obj1 = { name: filter, type: "recipeType" };
      setFilterRecipeTypeEasy(obj1);
      if (filterRecipeTypeEasy.name === "einfach") {
        setFilterRecipeTypeEasy({ name: "", type: "" });
      }
    }
    if (filter === "schnell") {
      console.log(filter);
      const obj2 = { name: filter, type: "recipeType" };
      setFilterRecipeTypeFast(obj2);
      if (filterRecipeTypeFast.name === "schnell") {
        setFilterRecipeTypeFast({ name: "", type: "" });
      }
    }
  };

  return (
    <Grid>
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
        <RecipesFilter
          onClickFilter={(e) => {
            handleFilter(e);
          }}
        />
      </Grid>

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
                      subtitle={recipe.categorie}
                    />
                  </ImageListItem>
                </Link>
              );
            })}
        </ImageList>
      )}
    </Grid>
  );
}
