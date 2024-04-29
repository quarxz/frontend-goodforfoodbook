import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import { Box, Stack, Grid, Rating, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import {
  purple,
  blue,
  red,
  pink,
  amber,
  grey,
  lightBlue,
  deepOrange,
  cyan,
  teal,
  lightGreen,
} from "@mui/material/colors";

const { VITE_API_URL: url } = import.meta.env;

export function RecipeBottomGallery({ recipe, trigger }) {
  const [recipesFromCategory, setRecipesFromCategory] = useState([]);
  const [recipeId, setRecipeId] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rating, setRating] = useState(3);

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
              <ImageListItem
                key={recipe._id}
                sx={{
                  m: 2,
                  boxShadow: "0px 0px 15px -5px rgba(0,0,0,0.85)",
                  opacity: ".9",

                  "&:hover": {
                    opacity: "1",
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out ",
                  },
                }}
              >
                <img src={`${recipe.thumbnail}`} alt={recipe.name} loading="lazy" />
                {/* <ImageListItemBar id={recipe._id} title={recipe.name} subtitle={recipe.categorie} /> */}
              </ImageListItem>
              <Grid container direction="column" pl={3}>
                {/* <Grid>
                        {recipe.category.name.charAt(0).toUpperCase() +
                          recipe.category.name.slice(1)}
                      </Grid> */}
                <Grid>
                  <Typography style={{ fontFamily: "Roboto-Medium" }}>{recipe.name}</Typography>
                </Grid>
                <Grid>
                  <Stack direction="row">
                    <Box pt={0.5}>
                      <Rating
                        name="simple-controlled"
                        value={recipe?.rating}
                        onChange={(event, newValue) => {
                          setRating(recipe?.rating);
                        }}
                        precision={0.5}
                        size="small"
                        icon={
                          <StarRateSharpIcon
                            fontSize="inherit"
                            sx={
                              theme.palette.mode === "light"
                                ? { color: teal[300] }
                                : { color: lightGreen[200] }
                            }
                          />
                        }
                      />
                    </Box>
                    <Box
                      pl={1}
                      sx={
                        theme.palette.mode === "light" ? { color: grey[400] } : { color: grey[500] }
                      }
                    >
                      <Typography style={{ fontFamily: "Roboto-Light" }}>
                        ({Math.floor(Math.random() * 45) + 1})
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Link>
          );
        })}
      </ImageList>
    </>
  );
}
