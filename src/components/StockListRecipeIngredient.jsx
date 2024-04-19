import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";

import { Box, Button, Stack } from "@mui/material";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import ProductionQuantityLimitsSharpIcon from "@mui/icons-material/ProductionQuantityLimitsSharp";

export function StockListRecipeIngredient({
  ingredient,
  isInStock,
  onAddIngredientToShoppingList,
  onDeleteIngredientFromShoppingList,
}) {
  const [countItem, setCountItem] = useState(
    ingredient.recipeQuantity === 0 ? 1 : ingredient.recipeQuantity
  );
  const [errorMessageTextfield, setErrorMessageTextfield] = useState("");

  const stockWarning = (quantity) => {
    return quantity > 0 && quantity >= ingredient.stockQuantity ? true : false;
  };

  const MIN_LENGTH = 1;

  return (
    <Stack spacing={2} direction="row">
      <Box
        p={2}
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
            {ingredient.category === "gewuerze" || ingredient.category === "kraeuter" ? (
              ""
            ) : (
              <>
                <Grid width={10}>{isInStock ? "Bestand:" : ""}</Grid>
                <Grid width={120}>
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
              </>
            )}

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
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              onClick={() => {
                countItem > 1 && setCountItem((prev) => prev - 1);
              }}
            >
              -
            </Button>
            <Box width={60}>
              <TextField
                error={errorMessageTextfield.length !== 0}
                id="outlined-basic"
                variant="outlined"
                sx={{ width: "60px" }}
                inputProps={{ min: 1, style: { textAlign: "right" }, maxLength: 3 }}
                value={countItem}
                onChange={(event) => {
                  const onlyNumb = event.target.value.replace(/[^0-9]/g, "0");
                  console.log(event.target.value.length);
                  if (isNaN(parseInt(onlyNumb))) {
                    setCountItem(0);
                  } else {
                    setCountItem(parseInt(onlyNumb));
                  }

                  // event.target.value === 0 ? setCountItem(0) : setCountItem(onlyNumb);

                  event.target.value === ""
                    ? setErrorMessageTextfield("Error!")
                    : setErrorMessageTextfield("");
                }}
                label={errorMessageTextfield}
              />
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
          <Tooltip
            title="Der Einkaufsliste hinzufügen"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            placement="top"
          >
            <Button
              onClick={() => {
                onAddIngredientToShoppingList(ingredient._id, countItem);
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
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              onClick={() => {
                countItem > 1 && setCountItem((prev) => prev - 1);
              }}
            >
              -
            </Button>
            <Box width={60}>
              <TextField
                error={errorMessageTextfield.length !== 0}
                id="outlined-basic"
                variant="outlined"
                sx={{ width: "60px" }}
                inputProps={{ min: 1, style: { textAlign: "right" }, maxLength: 3 }}
                value={countItem}
                onChange={(event) => {
                  const onlyNumb = event.target.value.replace(/[^0-9]/g, "0");
                  console.log(event.target.value.length);
                  if (isNaN(parseInt(onlyNumb))) {
                    setCountItem(0);
                  } else {
                    setCountItem(parseInt(onlyNumb));
                  }

                  // event.target.value === 0 ? setCountItem(0) : setCountItem(onlyNumb);

                  event.target.value === ""
                    ? setErrorMessageTextfield("Error!")
                    : setErrorMessageTextfield("");
                }}
                label={errorMessageTextfield}
              />
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

          <Tooltip
            title="Der Einkaufsliste hinzufügen"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            placement="top"
          >
            <Button
              onClick={() => {
                onAddIngredientToShoppingList(ingredient._id, countItem);
              }}
              variant="outlined"
            >
              <SendIcon />
            </Button>
          </Tooltip>

          {ingredient.shoppingListQuantity !== null && (
            <Tooltip
              title="Aus Shopping List entfernen"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 700 }}
              placement="left"
            >
              <Fab
                aria-label="delete"
                sx={{
                  "&:hover": {
                    bgcolor: red[600],
                  },
                }}
                onClick={() => {
                  onDeleteIngredientFromShoppingList(
                    ingredient._id,
                    ingredient.shoppingListQuantity
                  );
                }}
              >
                {ingredient.shoppingListQuantity}
              </Fab>
            </Tooltip>
          )}
        </>
      )}
    </Stack>
  );
}
