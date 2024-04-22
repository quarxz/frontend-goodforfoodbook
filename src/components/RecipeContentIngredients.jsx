import { useContext, useState, useEffect, useCallback } from "react";

import { Box, Button, Stack } from "@mui/material";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";

export function RecipeContentIngredients({ ingredient, countPersons }) {
  return (
    <Grid component="li" container spacing={2} direction="row" sx={{ padding: ".5em 0 " }}>
      <Grid width={40} textAlign="right">
        {ingredient.quantity === 0
          ? ""
          : countPersons > 1
          ? (ingredient.quantity * countPersons).toFixed(1) / 2
          : ingredient.quantity.toFixed(1) / 2}
      </Grid>
      <Grid width={200}>{ingredient.unit}</Grid>
      <Grid width={250}>{ingredient.name}</Grid>
    </Grid>
  );
}
