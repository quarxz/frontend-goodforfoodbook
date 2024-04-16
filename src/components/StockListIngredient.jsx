import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";

import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import EditSharpIcon from "@mui/icons-material/EditSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

export function StockListIngredient({ ingredient, onUpdateIngredientsList }) {
  const [countItem, setCountItem] = useState(1);

  const handleEditIngredient = () => {
    console.log("Update Ingredient");
  };
  const handleDeleteIngredient = () => {
    console.log("Delete Ingredient");
  };
  return (
    <Box
      p={2}
      sx={{ border: "1px solid #fff", display: "flex", justifyContent: "space-between" }}
      borderRadius={1}
      width="60%"
    >
      <Stack spacing={2} direction="row">
        <Grid container spacing={0} pt={1}>
          <Grid width={180}>{ingredient.name}</Grid>
          <Grid width={50}>{ingredient.quantity}</Grid>
          <Grid>{ingredient.unit}</Grid>
        </Grid>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button onClick={handleEditIngredient}>
          <EditSharpIcon />
        </Button>
        <Button
          onClick={() => {
            onUpdateIngredientsList(ingredient._id, countItem);
          }}
        >
          <ClearSharpIcon />
        </Button>
      </Stack>
    </Box>
  );
}
