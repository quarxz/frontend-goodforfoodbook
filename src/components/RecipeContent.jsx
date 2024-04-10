import { useState } from "react";
import styles from "./RecipeContent.module.css";
import { RecipeContentIngredients } from "./RecipeContentIngredients";

import { Box, Button, Grid, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export function RecipeContent({ recipe, isloading }) {
  const [countPersons, setCountPersons] = useState(2);
  return (
    <>
      {recipe?.image ? (
        <img
          src={`${recipe?.image}`}
          alt={`Bild für rezipe ${recipe?.name}`}
          loading="lazy"
          width={600}
        />
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
        <Box>
          <h2>{recipe?.name}</h2>

          <Stack
            spacing={5}
            direction="row"
            sx={{ padding: "1em 0 1em 0", border: "0px dashed grey" }}
          >
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
                <Box component="p">{countPersons} Personen</Box>
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
      )}

      {isloading ? (
        <Box component="div">
          <Skeleton variant="rectangular" animation="wave" width="30%" height="100px" />
        </Box>
      ) : (
        <Box component="div">
          <Box component="div" sx={{ padding: "1em 0 1em 0" }}>
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
    </>
  );
}

<h3>Zutaten</h3>;
{
}
