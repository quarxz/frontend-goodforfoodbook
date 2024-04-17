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

export function StockListRecipeIngredient({ ingredient, stock, stockItem, isInStock }) {
  const [countItem, setCountItem] = useState(ingredient.quantity);
  // console.log(stock);
  // console.log(isInStock);
  // return array.some(obj => obj.id === id);
  // console.log(stock?.some((obj) => obj.ingredient._id === ingredient._id));
  // stock?.map((item) => {
  //   if (item.ingredient._id !== ingredient._id) {
  //     console.log(item);
  //   }
  // });
  const getQuantityFromStockIngredient = stockItem?.map((item) => {
    return item && item.quantity;
  });

  const stockIngredientQuantity = getQuantityFromStockIngredient?.filter(
    (item) => typeof item === "number"
  )[0];

  const stockWarning = (quantity) => {
    return quantity > 0 && quantity >= stockIngredientQuantity ? true : false;
  };

  return (
    <Stack spacing={2} direction="row">
      <Box
        p={1.5}
        pl={3}
        sx={
          isInStock
            ? stockWarning(ingredient.quantity)
              ? { border: grey[200], backgroundColor: deepOrange[100] }
              : { border: grey[200], backgroundColor: lightGreen[200] }
            : { border: grey[200], backgroundColor: orange[100] }
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
                  {stockIngredientQuantity}
                </Box>
              ) : (
                <Box textAlign="right" pr={1}>
                  {ingredient.quantity}
                </Box>
              )}
            </Grid>
            <Grid width={180}>{ingredient.unit}</Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={0}>
            <Grid width={50}>
              {isInStock && ingredient.quantity > 0 ? "- " + ingredient.quantity : ""}
              {!isInStock && ingredient.quantity > 0 ? "+ " + ingredient.quantity : ""}
            </Grid>
            <Grid width={50}>
              {isInStock && stockWarning(ingredient.quantity) ? (
                <ProductionQuantityLimitsSharpIcon fontSize="small" />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isInStock && stockWarning(ingredient.quantity) && (
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
            <Box p={1} width={50} textAlign="right">
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
            <Button variant="outlined">
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
            <Box p={1} width={50} textAlign="right">
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
            <Button variant="outlined">
              <SendIcon />
            </Button>
          </Tooltip>
        </>
      )}
    </Stack>
  );
}
