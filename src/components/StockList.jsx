import styles from "./StockList.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";
import { Box, Stack } from "@mui/material";

import axios from "axios";

export function StockList() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stock, setStock] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const { user } = useContext(UserContext);
  const { ingredients: ingredientsFromRecipe } = useContext(IngredientContext);
  console.log("ingredientsFromRecipe:", ingredientsFromRecipe);

  const { VITE_API_URL: url } = import.meta.env;

  const loadIngredientsFromStock = useCallback(async () => {
    try {
      setIsLoading(true);
      const user = "65e5a98c3fd0f135269eabac";
      const { data } = await axios.get(`${url}/users/${user}/getIngredientsFromStock`);
      console.log(data.stock);
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
  });

  const loadIngredients = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/ingredients`);
      console.log(data.ingredients);
      console.log(data.message);
      setIngredients(data.ingredients);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  });
  useEffect(() => {
    loadIngredientsFromStock();
    loadIngredients();
  }, []);

  return (
    <>
      <h2>StockList</h2>

      <Box>
        <Link onClick={() => navigate(-1)}>Back</Link>
      </Box>

      {/* {ingredients.map((ingredient, index) => {
        return (
          <Stack key={ingredient._id} spacing={5} direction="row">
            <Box>{ingredient.quantity}</Box>
            <Box>{ingredient.ingredient.unit}</Box>
            <Box>{ingredient.ingredient.name}</Box>
          </Stack>
        );
      })} */}
    </>
  );
}
