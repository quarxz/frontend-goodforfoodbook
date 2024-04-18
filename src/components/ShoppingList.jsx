import styles from "./ShoppingList.module.css";

import { useContext, useState, useEffect, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { SnackbarProvider, useSnackbar } from "notistack";

import { AddIngredientPanel } from "./AddIngredientPanel";
import { ShoppingListIngredient } from "./ShoppingListIngredient";

import { Box, Button, Stack } from "@mui/material";

import axios from "axios";

export function ShoppingList() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shoppingList, setShoppingList] = useState(null);

  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const { VITE_API_URL: url } = import.meta.env;
  const user_id = "65e5a98c3fd0f135269eabac";

  const addIngredientToShoppingList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user_id}/addIngredientToSchoppingList`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "info" });
        loadIngredientsFromShoppingList();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user_id]
  );
  const loadIngredientsFromShoppingList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/users/${user_id}/getIngredientsFromShoppingList`);
      console.log(data.shoppingList);
      console.log(data.message);

      enqueueSnackbar(data.message, { variant: "success" });
      setShoppingList(data.shoppingList);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user_id]);

  useEffect(() => {
    loadIngredientsFromShoppingList();
  }, [url, user_id, loadIngredientsFromShoppingList]);

  return (
    <>
      <h2>Shopping List</h2>

      <Stack spacing={5} direction="column" pb={10}>
        <Box>
          <h4> Bestandsliste Artikel hinzufügen</h4>
        </Box>
        <Box p={2} sx={{ border: "1px solid #eee" }}>
          <AddIngredientPanel
            onUpdateIngredientsList={(ingredientObjId, quantity) => {
              addIngredientToShoppingList(ingredientObjId, quantity);
            }}
          />
        </Box>

        <Box>
          <Stack spacing={2} direction="column">
            <Box pb={2}>
              <h4>Aktueller Bestand</h4>
            </Box>
            {shoppingList?.map((ingredient) => {
              return (
                <ShoppingListIngredient
                  key={ingredient._id}
                  ingredient={
                    (ingredient = {
                      ...ingredient.ingredient,
                      quantity: ingredient.quantity,
                    })
                  }
                />
              );
            })}
            {}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
