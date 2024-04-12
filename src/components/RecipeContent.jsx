import { useContext, useState, useEffect, useCallback } from "react";
import styles from "./RecipeContent.module.css";
import { useNavigate } from "react-router-dom";
import { RecipeContentIngredients } from "./RecipeContentIngredients";

import axios from "axios";

import { Box, Button, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Gauge } from "@mui/x-charts/Gauge";
import Grid from "@mui/material/Unstable_Grid2";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// import SendIcon from "@mui/icons-material/Send";

export function RecipeContent({ recipe, isloading, id }) {
  const [isloadingIntern, setIsLoadingIntern] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const [countPersons, setCountPersons] = useState(2);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleCheckStock = () => {
    console.log("Hurra ich bin soweit");
    navigate("/stocklist");
  };

  const { VITE_API_URL: url } = import.meta.env;

  const checkRecipeIsInUserRecipeList = useCallback(async () => {
    console.log("Load Data");
    try {
      setIsLoadingIntern(true);
      if (recipe?.category) {
        const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user}/checkRecipeIsInUserRecipeList`, {
          recipeObjectId: id,
        });
        console.log(data.message);
        setIsChecked(!isChecked);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      // setIsChecked(!isChecked);
      setIsError(true);
    } finally {
      setIsLoadingIntern(false);
    }
  });
  const addRecipeToUserRecipeList = useCallback(async () => {
    console.log("Load Data");
    try {
      setIsLoadingIntern(true);
      if (recipe?.category) {
        const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user}/addRecipeToUserRecipeList`, {
          recipeObjectId: id,
        });
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      setIsChecked(!isChecked);

      setIsError(true);
    } finally {
      setIsLoadingIntern(false);
    }
  });
  const removeRecipeToUserRecipeList = useCallback(async () => {
    console.log("Load Data");
    try {
      setIsLoadingIntern(true);
      if (recipe?.category) {
        const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user}/deleteRecipeToUserRecipeList`, {
          recipeObjectId: id,
        });
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoadingIntern(false);
    }
  });

  const handleRecipeCheck = () => {
    if (!isChecked) {
      console.log("checked");
      addRecipeToUserRecipeList();
      setIsChecked(!isChecked);
    } else {
      console.log("unchecked");
      removeRecipeToUserRecipeList();
      setIsChecked(!isChecked);
    }
  };

  useEffect(() => {
    checkRecipeIsInUserRecipeList();
    // setIsChecked(!isChecked);
  }, [isloading]);

  return (
    <>
      {recipe?.image ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={7} md={7}>
              <img
                src={`${recipe?.image}`}
                alt={`Bild für rezipe ${recipe?.name}`}
                loading="lazy"
                width={600}
              />
            </Grid>
            <Grid xs={12} sm={5} md={5}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Rezept Merken"
                  onChange={handleRecipeCheck}
                  checked={isChecked}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Skeleton variant="rectangular" animation="wave" width={600} height={400} />
      )}

      {isloading ? (
        <Box>
          <h2>
            <Skeleton variant="rectangular" animation="wave" width="40%" />
          </h2>
          <h3>
            <Skeleton variant="rectangular" animation="wave" width="30%" />
          </h3>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <h2>{recipe?.name}</h2>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Box>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Box>
              </Grid>
              <Grid xs={8}>
                <Stack
                  spacing={5}
                  direction="row"
                  sx={{
                    p: 2,
                    width: "60%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box>
                    <Gauge
                      width={70}
                      height={70}
                      value={recipe?.preparationTime}
                      valueMin={0}
                      valueMax={60}
                    />
                    <span>Zubereitung</span>
                  </Box>

                  <Box>
                    <Gauge
                      width={70}
                      height={70}
                      value={recipe?.waitingTime}
                      valueMin={0}
                      valueMax={60}
                    />
                    <span>Wartezeit</span>
                  </Box>
                  <Box>
                    <Gauge
                      width={70}
                      height={70}
                      value={recipe?.preparationTime + recipe?.waitingTime}
                      valueMin={0}
                      valueMax={60}
                    />
                    <span>Gesamtzeit</span>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              padding: "3em 0 0",
              border: "0px dashed grey",
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Stack spacing={5} direction="row">
              <h2>Zutaten</h2>
              <Box>
                <Stack spacing={5} direction="row">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      countPersons > 1 && setCountPersons((prev) => (prev = prev - 1));
                    }}
                  >
                    -
                  </Button>
                  <Box component="p">
                    {countPersons} {countPersons > 1 ? "Personen" : "Person"}
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      countPersons < 10 && setCountPersons((prev) => (prev = prev + 1));
                    }}
                  >
                    +
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}

      {isloading ? (
        <Box>
          <Skeleton variant="rectangular" animation="wave" width="30%" height="100px" />
        </Box>
      ) : (
        <Box
          sx={{
            padding: "2em 0 0 0",
            border: "0px dashed grey",
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Box sx={{ padding: "2em 0 " }}>
            {recipe?.ingredients.map((ingredient) => {
              return (
                <RecipeContentIngredients
                  key={ingredient._id}
                  ingredient={{
                    ...ingredient.ingredient,
                    quantity: ingredient.quantity,
                  }}
                  countPersons={countPersons}
                />
              );
            })}
          </Box>
        </Box>
      )}
      {isloading ? (
        ""
      ) : (
        <Box
          sx={{
            padding: "1em 0 1em 0",
            border: "0px dashed grey",
            display: "flex",

            flexGrow: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <h2>Zubereitung</h2>
                {recipe?.preparing}
              </Grid>
              <Grid xs={6}></Grid>
            </Grid>
          </Box>
        </Box>
      )}

      {isloading ? (
        ""
      ) : (
        <Box p={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleCheckStock} size="large">
            Alles auf Lager? Jetzt Bestand prüfen!
          </Button>
        </Box>
      )}

      {isloading ? (
        ""
      ) : (
        <Box
          sx={{
            padding: "1em 0 1em 0",
            border: "0px dashed grey",
            display: "flex",

            flexGrow: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <h2>Weitere zur Suche passende Gerichte</h2>
              </Grid>
              <Grid xs={6}></Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {/* <Box>{JSON.stringify(recipe)}</Box> */}
    </>
  );
}
