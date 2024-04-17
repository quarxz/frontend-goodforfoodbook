import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";

import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import EditSharpIcon from "@mui/icons-material/EditSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

export function StockListIngredient({ ingredient, onUpdateIngredientsList }) {
  const [countItem, setCountItem] = useState(1);

  const handleEditIngredient = () => {
    console.log("Edit Ingredient");
  };

  return (
    <Stack spacing={2} direction="row">
      <Box
        p={1.5}
        pl={3}
        sx={{ border: "1px solid #fff", display: "flex", justifyContent: "space-between" }}
        borderRadius={1}
        width="60%"
      >
        <Stack spacing={2} direction="row">
          <Grid container spacing={0}>
            <Grid width={180}>{ingredient.name}</Grid>
            <Grid width={50}>
              <Box textAlign="right" pr={1}>
                {ingredient.quantity}
              </Box>
            </Grid>
            <Grid>{ingredient.unit}</Grid>
          </Grid>
        </Stack>
      </Box>
      <Stack spacing={2} direction="row">
        <Tooltip title="Zutat bearbeiten" placement="top">
          <Button onClick={handleEditIngredient} variant="outlined" size="small">
            <EditSharpIcon fontSize="small" />
          </Button>
        </Tooltip>
        <Tooltip title="Aus der Bestandliste löschen" placement="right-end">
          <Button
            onClick={() => {
              onUpdateIngredientsList(ingredient._id, countItem);
            }}
            variant="outlined"
            size="small"
          >
            <ClearSharpIcon fontSize="small" />
          </Button>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
