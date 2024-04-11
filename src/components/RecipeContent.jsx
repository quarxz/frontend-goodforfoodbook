import { useState } from "react";
import styles from "./RecipeContent.module.css";
import { RecipeContentIngredients } from "./RecipeContentIngredients";

import { Box, Button, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Gauge } from "@mui/x-charts/Gauge";
import Grid from "@mui/material/Unstable_Grid2";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// import SendIcon from "@mui/icons-material/Send";

export function RecipeContent({ recipe, isloading }) {
  const [countPersons, setCountPersons] = useState(2);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleCheckStock = () => {
    console.log("Hurra ich bin soweit");
  };

  return (
    <>
      {recipe?.image ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={7}>
              <img
                src={`${recipe?.image}`}
                alt={`Bild für rezipe ${recipe?.name}`}
                loading="lazy"
                width={600}
              />
            </Grid>
            <Grid xs={5}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Rezept Merken"
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
          <Button variant="contained" onClick={handleCheckStock}>
            Alles auf Lager - Bestand prüfen!
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
