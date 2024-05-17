import { useContext, useState, useEffect, useCallback, Fragment } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";
import { MessageContext } from "../context/MessageContext";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { SnackbarProvider, useSnackbar } from "notistack";

import { AlertDialog } from "./AlertDialog";

import { AddIngredientPanel } from "./AddIngredientPanel";
import { StockListRecipeIngredient } from "./StockListRecipeIngredient";
import { StockListIngredient } from "./StockListIngredient";

import { Box, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Fab from "@mui/material/Fab";

import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";

import { grey } from "@mui/material/colors";

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

  const navigate = useNavigate();
  const [isLoadingFromStock, setIsLoadingFromStock] = useState(false);
  const { user } = useContext(UserContext);
  const {
    ingredients: ingredientsFromRecipe,
    recipeName,
    recipeId,
  } = useContext(IngredientContext);
  if (ingredientsFromRecipe) {
    // console.log("ingredientsFromRecipe:", ingredientsFromRecipe);
  }
  const { addMessage } = useContext(MessageContext);
  const { addShoppingListContextIngredients } = useContext(ShoppingListContext);
  const { enqueueSnackbar } = useSnackbar();

  const { VITE_API_URL: url } = import.meta.env;

  const deleteIngredientFromStockList = useCallback(
    async (ingredientObjId, quantity) => {
      try {
        setIsLoading(true);
        // const user = "65e5a98c3fd0f135269eabac";
        const { data, status } = await axios.post(`${url}/users/${user?.id}/deleteIngredient`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data.message, status);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        console.error(err.response.data.message);
        console.error(err.response.status);
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
        const { data, status } = await axios.post(`${url}/users/${user?.id}/addIngredient`, {
          ingredientObjId: ingredientObjId,
          quantity: quantity,
        });
        console.log(data.message, status);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        console.error(err.response.data.message);
        console.error(err.response.status);
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
      const { data, status } = await axios.get(`${url}/users/${user?.id}/getIngredientsFromStock`);
      console.log(data.message, status);
      setStock(data.stock);
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message);
      console.error(err.response.status);
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
        const { data, status } = await axios.post(
          `${url}/users/${user?.id}/deleteIngredientFromSchoppingList`,
          {
            ingredientObjId: ingredientObjId,
            quantity: quantity,
          }
        );
        console.log(data.message, status);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromShoppingList();
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        console.error(err.response.data.message);
        console.error(err.response.status);
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
        const { data, status } = await axios.post(
          `${url}/users/${user?.id}/addIngredientToSchoppingList`,
          {
            ingredientObjId: ingredientObjId,
            quantity: quantity,
          }
        );
        console.log(data.message, status);
        enqueueSnackbar(data.message, { variant: "success" });
        loadIngredientsFromShoppingList();
        loadIngredientsFromStock();
      } catch (err) {
        console.log(err);
        console.error(err.response.data.message);
        console.error(err.response.status);
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
      const { data, status } = await axios.get(
        `${url}/users/${user?.id}/getIngredientsFromShoppingList`
      );
      console.log(data.message, status);
      setShoppingList(data.shoppingList);
      addShoppingListContextIngredients(data.shoppingList.length);
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message);
      console.error(err.response.status);
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
    setMerged(merged);
    console.log(merged);
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
      <h2>Deine Zutaten Listen</h2>
      {recipeId ? (
        <Box p={3}>
          <Button
            variant="outlined"
            component={NavLink}
            color="primary"
            aria-label="to top button"
            // onClick={() => navigate(-1)}
            to={"/" + recipeId}
            startIcon={<ArrowBackIosNewSharpIcon />}
          >
            zurück zum Rezept: {recipeName}
          </Button>
          <Link></Link>
        </Box>
      ) : (
        ""
      )}

      <AlertDialog
        openDialog={openDialog}
        onHandleDecition={(val, decition) => {
          handleClickDecition(false, val, decition);
        }}
      />

      <Grid spacing={2} direction="column">
        <Grid
          container
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid>
            <h4>Bestandsliste Artikel hinzufügen</h4>
          </Grid>
          <Grid pt={2}>
            <PlaylistAddSharpIcon fontSize="large" />
          </Grid>
        </Grid>
        <Grid
          p={2}
          sx={{ borderColor: grey[800], borderWidth: "0px", borderStyle: "solid" }}
          borderRadius={1}
        >
          <AddIngredientPanel
            onUpdateIngredientsList={(ingredientObjId, quantity) => {
              addIngredientToStockList(ingredientObjId, quantity);
            }}
          />
        </Grid>

        <Grid direction="column" mt={5}>
          <Grid>
            {ingredientsFromRecipe ? (
              <Stack spacing={0.5} direction="column">
                <Box pb={5} pt={2}>
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
                    // const stockEqualsrecipeQunatity =
                    //   ingredient.stockQuantity === ingredient.recipeQuantity;
                    const stockBiggerRecipeQuantity =
                      ingredient.stockQuantity > ingredient.recipeQuantity;
                    return (
                      <Fragment key={ingredient._id}>
                        {isInStock && stockBiggerRecipeQuantity && (
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
                    const stockBiggerRecipeQuantity =
                      ingredient.stockQuantity > ingredient.recipeQuantity;
                    return (
                      <Fragment key={ingredient._id}>
                        {isInStock && !stockBiggerRecipeQuantity && (
                          <StockListRecipeIngredient
                            key={ingredient._id}
                            isInStock={stock?.some((obj) => obj.ingredient._id === ingredient._id)}
                            ingredient={ingredient}
                            onAddIngredientToShoppingList={(ingredientObjId, quantity) => {
                              addIngredientToShoppingList(ingredientObjId, quantity);
                            }}
                            onDeleteIngredientFromShoppingList={(ingredientObjId, quantity) => {
                              console.log("delete: isInstock and Equal Res");
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
                              console.log("delete: isInstock");
                              deleteIngredientFromShoppingList(ingredientObjId, quantity);
                            }}
                          />
                        )}
                      </Fragment>
                    );
                  })}
              </Stack>
            ) : (
              ""
            )}
          </Grid>
          <Grid mt={5}>
            <Stack spacing={0.2} direction="column">
              <Box pb={5} pt={2}>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
