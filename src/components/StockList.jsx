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

  const [stockWithRecipeIngredients, setStockWithRecipeIngredients] = useState([]);

  const { user } = useContext(UserContext);
  const { ingredients: ingredientsFromRecipe } = useContext(IngredientContext);
  // if (ingredientsFromRecipe) {
  //   console.log("ingredientsFromRecipe:", ingredientsFromRecipe);
  // }

  const { VITE_API_URL: url } = import.meta.env;
  const user_id = "65e5a98c3fd0f135269eabac";

  const deleteIngredientToStockList = useCallback(
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

  useEffect(() => {
    loadIngredientsFromStock();
  }, [url, user_id, loadIngredientsFromStock]);

  return (
    <>
      <h2>StockList</h2>

      {/* <Box p={10}>
        <Link onClick={() => navigate(-1)}>Back</Link>
      </Box> */}
      <Stack spacing={8} direction="column" pb={10}>
        {ingredientsFromRecipe ? (
          <Box>
            <Stack spacing={2} direction="column">
              <Box pb={2}>
                <h3> Zutatenliste für das Rezept: [Rezeptname]</h3>
              </Box>
              {ingredientsFromRecipe?.map((ingredient) => {
                return (
                  <Fragment key={ingredient._id}>
                    {stock?.some((obj) => obj.ingredient._id === ingredient.ingredient._id) && (
                      <StockListRecipeIngredient
                        key={ingredient._id}
                        stockItem={stock?.map((item) => {
                          return item.ingredient._id === ingredient.ingredient._id && item;
                        })}
                        isInStock={stock?.some(
                          (obj) => obj.ingredient._id === ingredient.ingredient._id
                        )}
                        ingredient={
                          (ingredient = {
                            ...ingredient.ingredient,
                            quantity: ingredient.quantity,
                          })
                        }
                        onUpdateIngredientsList={(ingredientObjId, quantity) => {
                          deleteIngredientToStockList(ingredientObjId, quantity);
                        }}
                        stock={stock}
                      />
                    )}
                  </Fragment>
                );
              })}
              {ingredientsFromRecipe?.map((ingredient) => {
                return (
                  <Fragment key={ingredient._id}>
                    {!stock?.some((obj) => obj.ingredient._id === ingredient.ingredient._id) && (
                      <StockListRecipeIngredient
                        key={ingredient._id}
                        stockItem={stock?.map((item) => {
                          return item.ingredient._id === ingredient.ingredient._id && item;
                        })}
                        isInStock={stock?.some(
                          (obj) => obj.ingredient._id === ingredient.ingredient._id
                        )}
                        ingredient={
                          (ingredient = {
                            ...ingredient.ingredient,
                            quantity: ingredient.quantity,
                          })
                        }
                        onUpdateIngredientsList={(ingredientObjId, quantity) => {
                          deleteIngredientToStockList(ingredientObjId, quantity);
                        }}
                        stock={stock}
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

        <Box p={5} sx={{ border: "1px solid #eee" }}>
          <AddIngredientPanel
            onUpdateIngredientsList={(ingredientObjId, quantity) => {
              addIngredientToStockList(ingredientObjId, quantity);
            }}
          />
        </Box>
        <Box>
          <Stack spacing={2} direction="column">
            <Box pb={2}>
              <h3>Aktueller Bestand</h3>
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
                    deleteIngredientToStockList(ingredientObjId, quantity);
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
