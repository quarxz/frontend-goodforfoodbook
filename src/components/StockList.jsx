import styles from "./StockList.module.css";
import { useContext, useState, useEffect, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { MessageContext } from "../context/MessageContext";
import { SnackbarProvider, useSnackbar } from "notistack";

import { AlertDialog } from "./AlertDialog";

import { AddIngredientPanel } from "./AddIngredientPanel";
import { StockListRecipeIngredient } from "./StockListRecipeIngredient";
import { StockListIngredient } from "./StockListIngredient";

import { Box, Button, Stack } from "@mui/material";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";

import axios from "axios";

export function StockList() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stock, setStock] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);

  const [merged, setMerged] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDeleteIngredient, setIdToDeleteIngredient] = useState();
  const [amountToDelete, setAmountToDelete] = useState();

  const [isLoadingFromStock, setIsLoadingFromStock] = useState(false);
  const { user } = useContext(UserContext);
  const { ingredients: ingredientsFromRecipe, recipeName } = useContext(IngredientContext);
  if (ingredientsFromRecipe) {
    console.log("ingredientsFromRecipe:", ingredientsFromRecipe);
  }
  const { addMessage } = useContext(MessageContext);
  const { enqueueSnackbar } = useSnackbar();

  const { VITE_API_URL: url } = import.meta.env;

  const deleteIngredientFromStockList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user?.id}/deleteIngredient`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user?.id]
  );

  const addIngredientToStockList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user?.id}/addIngredient`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data);
        console.log(data.message);
        addMessage(data.message);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user?.id]
  );

  const loadIngredientsFromStock = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsLoadingFromStock(true);
      const { data } = await axios.get(`${url}/users/${user?.id}/getIngredientsFromStock`);
      console.log(data.stock);
      console.log(data.message);
      // enqueueSnackbar(data.message, { variant: "info" });
      setStock(data.stock);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      enqueueSnackbar(err.message, { variant: "error" });
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingFromStock(false);
    }
  }, [url, user?.id]);

  const deleteIngredientFromShoppingList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(
          `${url}/users/${user?.id}/deleteIngredientFromSchoppingList`,
          {
            ingredientObjId: ingredientObjId,
            quantity: quantity,
          }
        );
        console.log(data);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromShoppingList();
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user?.id]
  );

  const addIngredientToShoppingList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data } = await axios.post(`${url}/users/${user?.id}/addIngredientToSchoppingList`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data);
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromShoppingList();
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "error" });
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url, user?.id]
  );
  const loadIngredientsFromShoppingList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/users/${user?.id}/getIngredientsFromShoppingList`);
      console.log(data.shoppingList);
      console.log(data.message);
      // enqueueSnackbar(data.message, { variant: "info" });
      setShoppingList(data.shoppingList);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      console.log(err.response.status);
      enqueueSnackbar(err.message, { variant: "error" });
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, user?.id]);

  useEffect(() => {
    loadIngredientsFromStock();
    loadIngredientsFromShoppingList();
  }, [url, user?.id, loadIngredientsFromStock, loadIngredientsFromShoppingList]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const mergeIngredientsQuantities = useCallback(() => {
    console.log("merge");
    let ingredientsShoppingList = [];
    let ingredientsRecipe = [];
    let ingredientsStock = [];
    let merged = [];
    shoppingList?.map(async (item) => {
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
    ingredientsFromRecipe && mergeIngredientsQuantities();
  }, [stock, mergeIngredientsQuantities]);

  const handleClickOpenDialog = (id, amount, val) => {
    console.log(id);
    console.log(amount);
    setIdToDeleteIngredient(id);
    setAmountToDelete(amount);
    setOpenDialog(val);
  };
  const handleClickDecition = (bool, val, decition) => {
    console.log(val, decition, idToDeleteIngredient);
    setOpenDialog(bool);
    if (decition === "AGREE") {
      deleteIngredientFromStockList(idToDeleteIngredient, amountToDelete);
    }
  };

  return (
    <>
      <h2>StockList</h2>

      {/* <Box p={10}>
        <Link onClick={() => navigate(-1)}>Back</Link>
      </Box> */}

      <AlertDialog
        openDialog={openDialog}
        onHandleDecition={(val, decition) => {
          handleClickDecition(false, val, decition);
        }}
      />

      <Stack spacing={5} direction="column" pb={10}>
        <Box>
          <h4> Bestandsliste Artikel hinzufügen</h4>
        </Box>
        <Box
          p={2}
          sx={{ borderColor: grey[800], borderWidth: "1px", borderStyle: "solid" }}
          borderRadius={1}
        >
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
                <h4>Zutatenliste für {recipeName}</h4>
              </Box>
              {/* /** 
                IS In STOCK
              */}
              {merged
                ?.slice()
                .sort((a, b) => {
                  return a.name.localeCompare(b.name);
                })
                .map((ingredient) => {
                  const isInStock = stock?.some((obj) => obj.ingredient._id === ingredient._id);
                  const stockEqualsrecipeQunatity =
                    ingredient.stockQuantity === ingredient.recipeQuantity;
                  return (
                    <Fragment key={ingredient._id}>
                      {isInStock && !stockEqualsrecipeQunatity && (
                        <StockListRecipeIngredient
                          key={ingredient._id}
                          isInStock={stock?.some((obj) => obj.ingredient._id === ingredient._id)}
                          ingredient={ingredient}
                          onAddIngredientToShoppingList={(ingredientObjId, quantity) => {
                            addIngredientToShoppingList(ingredientObjId, quantity);
                          }}
                        />
                      )}
                    </Fragment>
                  );
                })}
              {/* /** 
                 IS NOT IN STOCK && STOCK EQUAL RECIPE QUANTITY
                */}
              {merged
                ?.slice()
                .sort((a, b) => {
                  return a.name.localeCompare(b.name);
                })
                .map((ingredient) => {
                  const isInStock = stock?.some((obj) => obj.ingredient._id === ingredient._id);
                  const stockEqualsrecipeQunatity =
                    ingredient.stockQuantity === ingredient.recipeQuantity;
                  return (
                    <Fragment key={ingredient._id}>
                      {isInStock && stockEqualsrecipeQunatity && (
                        <StockListRecipeIngredient
                          key={ingredient._id}
                          isInStock={stock?.some((obj) => obj.ingredient._id === ingredient._id)}
                          ingredient={ingredient}
                          onAddIngredientToShoppingList={(ingredientObjId, quantity) => {
                            addIngredientToShoppingList(ingredientObjId, quantity);
                          }}
                          onDeleteIngredientFromShoppingList={(ingredientObjId, quantity) => {
                            deleteIngredientFromShoppingList(ingredientObjId, quantity);
                          }}
                        />
                      )}
                    </Fragment>
                  );
                })}
              {/* /** 
                 IS NOT IN STOCK
                */}
              {merged
                ?.slice()
                .sort((a, b) => {
                  return a.name.localeCompare(b.name);
                })
                .map((ingredient) => {
                  const isInStock = stock?.some((obj) => obj.ingredient._id === ingredient._id);
                  return (
                    <Fragment key={ingredient._id}>
                      {!isInStock && (
                        <StockListRecipeIngredient
                          key={ingredient._id}
                          isInStock={stock?.some((obj) => obj.ingredient._id === ingredient._id)}
                          ingredient={ingredient}
                          onAddIngredientToShoppingList={(ingredientObjId, quantity) => {
                            addIngredientToShoppingList(ingredientObjId, quantity);
                          }}
                          onDeleteIngredientFromShoppingList={(ingredientObjId, quantity) => {
                            deleteIngredientFromShoppingList(ingredientObjId, quantity);
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
            {stock
              ?.slice()
              .sort((a, b) => {
                return a.ingredient.name.localeCompare(b.ingredient.name);
              })
              .map((ingredient) => {
                return (
                  <StockListIngredient
                    key={ingredient._id}
                    ingredient={
                      (ingredient = {
                        ...ingredient.ingredient,
                        quantity: ingredient.quantity,
                      })
                    }
                    onDeleteIngredientFromStockList={(ingredientObjId, quantity) => {
                      deleteIngredientFromStockList(ingredientObjId, quantity);
                    }}
                    onAddIngredientToStockList={(ingredientObjId, quantity) => {
                      addIngredientToStockList(ingredientObjId, quantity);
                    }}
                    onOpenDialog={(id, amount, val) => {
                      handleClickOpenDialog(id, amount, val);
                    }}
                    isLoadingFromStock={isLoadingFromStock}
                  />
                );
              })}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
