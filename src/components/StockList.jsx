import styles from "./StockList.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";

import { Box, Button, Stack } from "@mui/material";

import axios from "axios";

export function StockList() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stock, setStock] = useState(null);

  const [stockWithRecipeIngredients, setStockWithRecipeIngredients] = useState([]);

  const { user } = useContext(UserContext);
  const { ingredients: ingredientsFromRecipe } = useContext(IngredientContext);
  if (ingredientsFromRecipe) {
    console.log("ingredientsFromRecipe:", ingredientsFromRecipe);
  }

  const { VITE_API_URL: url } = import.meta.env;
  const user_id = "65e5a98c3fd0f135269eabac";

  const updateStockList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user_id}/addIngredient`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data);
        console.log(data.message);
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user_id]
  );

  const loadIngredientsFromStock = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${url}/users/${user_id}/getIngredientsFromStock`);
      // console.log(data.stock);
      console.log(data.message);
      setStock(data.stock);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user_id]);

  const mergeStockWithRecipeIngredients = useCallback(async () => {
    setStockWithRecipeIngredients(
      stock?.map((stockIngredient) => {
        stockIngredient = stockIngredient.ingredient;
        console.log(stockIngredient.name);
      })
    );
  }, [url]);

  useEffect(() => {
    loadIngredientsFromStock();
    mergeStockWithRecipeIngredients();
  }, [url, user_id, loadIngredientsFromStock]);

  return (
    <>
      <h2>StockList</h2>

      <Box p={10}>
        <Link onClick={() => navigate(-1)}>Back</Link>
      </Box>

      <AddIngredientPanel
        onUpdateIngredientsList={(ingredientObjId, quantity) => {
          updateStockList(ingredientObjId, quantity);
        }}
      />

      <Box p={10}>
        {stock?.map((ingredient, index) => {
          return (
            <Stack key={ingredient._id} spacing={5} direction="row">
              <Box>{ingredient.quantity}</Box>
              <Box>{ingredient.ingredient.unit}</Box>
              <Box>{ingredient.ingredient.name}</Box>
            </Stack>
          );
        })}
      </Box>
    </>
  );
}
