import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export function RecipeContentIngredients({ ingredient, countPersons }) {
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ padding: ".5em 0 " }}>
        {ingredient.quantity === 0 ? (
          ""
        ) : countPersons > 1 ? (
          <Box>{(ingredient.quantity * countPersons).toFixed(1) / 2} </Box>
        ) : (
          <Box>{ingredient.quantity.toFixed(1) / 2} </Box>
        )}
        <Box>{ingredient.unit}</Box>
        <Box>{ingredient.name}</Box>
      </Stack>
    </>
  );
}
