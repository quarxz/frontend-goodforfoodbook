import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";

import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { lightGreen, grey, red, orange, deepOrange } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import ProductionQuantityLimitsSharpIcon from "@mui/icons-material/ProductionQuantityLimitsSharp";

export function StockListRecipeIngredient({ ingredient, isInStock, onUpdateIngredientsList }) {
  const [countItem, setCountItem] = useState(ingredient.recipeQuantity);

  const stockWarning = (quantity) => {
    return quantity > 0 && quantity >= ingredient.stockQuantity ? true : false;
  };

  return (
    <Stack spacing={2} direction="row">
      <Box
        p={1.5}
        pl={3}
        sx={
          isInStock
            ? stockWarning(ingredient.recipeQuantity)
              ? { border: deepOrange[100], backgroundColor: deepOrange[100] }
              : { border: lightGreen[200], backgroundColor: lightGreen[200] }
            : { border: orange[100], backgroundColor: orange[100] }
        }
        borderRadius={1}
        width="60%"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Grid container spacing={0}>
            <Grid width={180}>{ingredient.name}</Grid>
            <Grid width={50}>
              {isInStock ? (
                <Box textAlign="right" pr={1}>
                  {ingredient.stockQuantity}
                </Box>
              ) : (
                <Box textAlign="right" pr={1}>
                  {ingredient.recipeQuantity}
                </Box>
              )}
            </Grid>
            <Grid width={180}>{ingredient.unit}</Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={0}>
            <Grid width={50}>
              {isInStock && ingredient.recipeQuantity > 0 ? "- " + ingredient.recipeQuantity : ""}
              {!isInStock && ingredient.recipeQuantity > 0 ? "+ " + ingredient.recipeQuantity : ""}
            </Grid>
            <Grid width={50}>
              {isInStock && stockWarning(ingredient.recipeQuantity) ? (
                <ProductionQuantityLimitsSharpIcon fontSize="small" />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isInStock && stockWarning(ingredient.recipeQuantity) && (
        <>
          <Stack spacing={3} direction="row">
            <Button
              variant="outlined"
              onClick={() => {
                countItem > 1 && setCountItem((prev) => prev - 1);
              }}
            >
              -
            </Button>
            <Box p={1} width={40} textAlign="right">
              {countItem}
            </Box>
            <Button
              variant="outlined"
              onClick={() => {
                countItem > 0 && setCountItem((prev) => prev + 1);
              }}
            >
              +
            </Button>
          </Stack>
          <Tooltip title="Der Einkaufsliste hinzufügen" placement="right-end">
            <Button
              onClick={() => {
                onUpdateIngredientsList(ingredient._id, countItem);
              }}
              variant="outlined"
            >
              <SendIcon />
            </Button>
          </Tooltip>
        </>
      )}
      {!isInStock && (
        <>
          <Stack spacing={3} direction="row">
            <Button
              variant="outlined"
              onClick={() => {
                countItem > 1 && setCountItem((prev) => prev - 1);
              }}
            >
              -
            </Button>
            <Box p={1} width={40} textAlign="right">
              {countItem}
            </Box>
            <Button
              variant="outlined"
              onClick={() => {
                countItem > 0 && setCountItem((prev) => prev + 1);
              }}
            >
              +
            </Button>
          </Stack>
          <Tooltip title="Der Einkaufsliste hinzufügen" placement="right-end">
            <Button
              onClick={() => {
                onUpdateIngredientsList(ingredient._id, countItem);
              }}
              variant="outlined"
            >
              <SendIcon />
            </Button>
          </Tooltip>
        </>
      )}
    </Stack>
  );
}
