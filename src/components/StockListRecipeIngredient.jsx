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

import SendIcon from "@mui/icons-material/Send";

export function StockListRecipeIngredient({ ingredient, stock, stockItem, isInStock }) {
  const [countItem, setCountItem] = useState(ingredient.quantity);
  const [stockIngredient, setStockIngredient] = useState(null);
  // console.log(stock);
  console.log(isInStock);
  // return array.some(obj => obj.id === id);
  // console.log(stock?.some((obj) => obj.ingredient._id === ingredient._id));
  // stock?.map((item) => {
  //   if (item.ingredient._id !== ingredient._id) {
  //     console.log(item);
  //   }
  // });
  // stockItem.map((item) => {
  //   return item && console.log(item);
  // });
  return (
    <Stack spacing={2} direction="row">
      <Box p={2} sx={{ border: "1px solid #fff" }} borderRadius={1} width="50%">
        <Grid container spacing={0}>
          <Grid width={180}>{ingredient.name}</Grid>
          <Grid width={50}>{ingredient.quantity}</Grid>
          <Grid>{ingredient.unit}</Grid>
        </Grid>
      </Box>
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
            <Box p={2} width={50} textAlign="center">
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
          <Button variant="outlined">
            <SendIcon />
          </Button>
        </>
      )}
    </Stack>
  );
}
