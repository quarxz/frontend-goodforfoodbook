import styles from "./StockList.module.css";
import { useContext, useState, useEffect, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";
import { StockListRecipeIngredient } from "./StockListRecipeIngredient";
import { StockListIngredient } from "./StockListIngredient";

import { Box, Button, Stack } from "@mui/material";

import axios from "axios";

export function StockList() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stock, setStock] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);

  const [merged, setMerged] = useState(null);

  const { user } = useContext(UserContext);
  const { ingredients: ingredientsFromRecipe } = useContext(IngredientContext);
  if (ingredientsFromRecipe) {
    console.log("ingredientsFromRecipe:", ingredientsFromRecipe);
  }

  const { VITE_API_URL: url } = import.meta.env;
  const user_id = "65e5a98c3fd0f135269eabac";

  const deleteIngredientFromStockList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user_id}/deleteIngredient`, {
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

  const addIngredientToStockList = useCallback(
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
        loadIngredientsFromShoppingList();
      } catch (err) {
        console.log(err);
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
      setShoppingList(data.shoppingList);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user_id]);

  useEffect(() => {
    loadIngredientsFromStock();
    loadIngredientsFromShoppingList();
  }, [url, user_id, loadIngredientsFromStock, loadIngredientsFromShoppingList]);

  const merge = useCallback(() => {
    console.log("merge");
    let ingredientsShoppingList = [];
    let ingredientsRecipe = [];
    let ingredientsStock = [];
    let merged = [];
    ingredientsFromRecipe?.map(async (item) => {
      // console.log(item.ingredient.name);
      ingredientsShoppingList.push({
        _id: item.ingredient._id,
        name: item.ingredient.name,
        unit: item.ingredient.unit,
        category: item.ingredient.category,
        quantity: item.quantity,
      });
    });
    ingredientsFromRecipe?.map(async (item) => {
      // console.log(item.ingredient.name);
      ingredientsRecipe.push({
        _id: item.ingredient._id,
        name: item.ingredient.name,
        unit: item.ingredient.unit,
        category: item.ingredient.category,
        quantity: item.quantity,
      });
    });
    // console.log(ingredientsRecipe);
    stock?.map(async (item) => {
      // console.log(item.ingredient.name);
      ingredientsStock.push({
        _id: item.ingredient._id,
        name: item.ingredient.name,
        unit: item.ingredient.unit,
        category: item.ingredient.category,
        quantity: item.quantity,
      });
    });
    // console.log(ingredientsStock);
    function extractNumber(array) {
      const numbers = array.filter((item) => typeof item === "number");
      return numbers.length > 0 ? numbers[0] : null;
    }
    ingredientsRecipe?.map(async (recipeItem) => {
      merged.push({
        _id: recipeItem._id,
        name: recipeItem.name,
        unit: recipeItem.unit,
        category: recipeItem.category,
        recipeQuantity: recipeItem.quantity,
        stockQuantity: extractNumber(
          ingredientsStock.map((stockItem) => {
            if (recipeItem._id === stockItem._id) {
              return stockItem.quantity;
            }
          })
        ),
        shoppingListQuantity: extractNumber(
          ingredientsShoppingList.map((shoppingListItem) => {
            if (recipeItem._id === shoppingListItem._id) {
              return shoppingListItem.quantity;
            }
          })
        ),
      });
    });
    console.log(merged);
    setMerged(merged);
  }, [stock]);

  useEffect(() => {
    ingredientsFromRecipe && merge();
  }, [stock, merge]);

  return (
    <>
      <h2>StockList</h2>

      {/* <Box p={10}>
        <Link onClick={() => navigate(-1)}>Back</Link>
      </Box> */}

      <Stack spacing={5} direction="column" pb={10}>
        <Box>
          <h4> Bestandsliste Artikel hinzufügen</h4>
        </Box>
        <Box p={2} sx={{ border: "1px solid #eee" }}>
          <AddIngredientPanel
            onUpdateIngredientsList={(ingredientObjId, quantity) => {
              addIngredientToStockList(ingredientObjId, quantity);
            }}
          />
        </Box>
        {ingredientsFromRecipe ? (
          <Box>
            <Stack spacing={2} direction="column">
              <Box pb={2}>
                <h4>Zutatenliste für das Rezept: [Rezeptname]</h4>
              </Box>
              {merged?.map((ingredient) => {
                return (
                  <Fragment key={ingredient._id}>
                    {stock?.some((obj) => obj.ingredient._id === ingredient._id) && (
                      <StockListRecipeIngredient
                        key={ingredient._id}
                        isInStock={stock?.some((obj) => obj.ingredient._id === ingredient._id)}
                        ingredient={ingredient}
                        onUpdateIngredientsList={(ingredientObjId, quantity) => {
                          addIngredientToShoppingList(ingredientObjId, quantity);
                        }}
                      />
                    )}
                  </Fragment>
                );
              })}
              {merged?.map((ingredient) => {
                return (
                  <Fragment key={ingredient._id}>
                    {!stock?.some((obj) => obj.ingredient._id === ingredient._id) && (
                      <StockListRecipeIngredient
                        key={ingredient._id}
                        isInStock={stock?.some((obj) => obj.ingredient._id === ingredient._id)}
                        ingredient={ingredient}
                        onUpdateIngredientsList={(ingredientObjId, quantity) => {
                          addIngredientToShoppingList(ingredientObjId, quantity);
                        }}
                      />
                    )}
                  </Fragment>
                );
              })}
            </Stack>
          </Box>
        ) : (
          ""
        )}

        <Box>
          <Stack spacing={2} direction="column">
            <Box pb={2}>
              <h4>Aktueller Bestand</h4>
            </Box>
            {stock?.map((ingredient, index) => {
              return (
                <StockListIngredient
                  key={ingredient._id}
                  ingredient={
                    (ingredient = {
                      ...ingredient.ingredient,
                      quantity: ingredient.quantity,
                    })
                  }
                  onUpdateIngredientsList={(ingredientObjId, quantity) => {
                    deleteIngredientFromStockList(ingredientObjId, quantity);
                  }}
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
