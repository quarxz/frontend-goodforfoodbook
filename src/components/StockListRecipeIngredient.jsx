import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import { AddIngredientPanel } from "./AddIngredientPanel";

import { Box, Button, Stack, Typography } from "@mui/material";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
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
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
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

  const [visibility, setVisibility] = useState("hidden");

  const stockWarning = (quantity) => {
    return quantity > 0 && quantity >= ingredient.stockQuantity ? true : false;
  };

  const timer = setTimeout(() => {
    setVisibility("visible");
  }, 2000);

  const MIN_LENGTH = 1;

  return (
    <>
      {/* {visibility === "hidden" ? (
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rectangular" animation="wave" width="60%" height={60} />
          <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
          <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
          <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
          <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
        </Stack>
      ) : (
        <> */}
      <Stack spacing={2} direction="row">
        {visibility === "hidden" ? (
          <Skeleton variant="rectangular" animation="wave" width="60%" height={60} />
        ) : (
          <Box
            p={1.3}
            pl={3}
            sx={
              isInStock
                ? stockWarning(ingredient.recipeQuantity)
                  ? {
                      border: orange[500],
                      backgroundColor: orange[500],
                      cursor: "pointer",
                      opacity: "0.9",
                      zIndex: "1",
                      "&:hover": {
                        border: orange[300],
                        backgroundColor: orange[300],
                        opacity: "1",
                        transform: "scale(1.05)",
                        transition: "all 0.3s ease-in-out ",
                      },
                    }
                  : {
                      border: lightGreen[500],
                      backgroundColor: lightGreen[500],
                      cursor: "pointer",
                      opacity: "0.9",
                      zIndex: "1",
                      "&:hover": {
                        border: lightGreen[300],
                        bgcolor: lightGreen[300],
                        opacity: "1",
                        transform: "scale(1.05)",
                        transition: "transform 0.3s ease-in-out ",
                      },
                    }
                : {
                    border: deepOrange[500],
                    backgroundColor: deepOrange[500],
                    cursor: "pointer",
                    opacity: "0.9",
                    zIndex: "1",
                    "&:hover": {
                      border: deepOrange[300],
                      bgcolor: deepOrange[300],
                      opacity: "1",
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out ",
                    },
                  }
            }
            borderRadius={1}
            width="60%"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Grid container spacing={0}>
                <Grid width={180} pt={1}>
                  {ingredient.name}
                </Grid>
                {ingredient.category === "gewuerze" || ingredient.category === "kraeuter" ? (
                  ""
                ) : (
                  <>
                    <Grid width={10} pt={1}>
                      {isInStock ? "Bestand:" : ""}
                    </Grid>
                    <Grid width={120}>
                      {isInStock ? (
                        <Box textAlign="right" pr={1}>
                          <Typography style={{ fontFamily: "Roboto-Black", fontSize: "1.5em" }}>
                            {ingredient.stockQuantity}
                          </Typography>
                        </Box>
                      ) : (
                        <Box textAlign="right" pr={1}>
                          <Typography style={{ fontFamily: "Roboto-Black", fontSize: "1.5em" }}>
                            {ingredient.recipeQuantity}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </>
                )}

                <Grid width={180} pt={1}>
                  {ingredient.unit}
                </Grid>
              </Grid>
            </Box>
            <Box pt={1}>
              <Grid container>
                <Grid width={50}>
                  {isInStock && ingredient.recipeQuantity > 0
                    ? "- " + ingredient.recipeQuantity
                    : ""}
                  {!isInStock && ingredient.recipeQuantity > 0
                    ? "+ " + ingredient.recipeQuantity
                    : ""}
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
        )}
        {isInStock && stockWarning(ingredient.recipeQuantity) && (
          <>
            {visibility === "hidden" ? (
              <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="circular" width={60} height={60} />
              </Stack>
            ) : (
              <>
                <Stack spacing={2} direction="row">
                  <Box pt={1.3}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        countItem > 1 && setCountItem((prev) => prev - 1);
                      }}
                    >
                      <RemoveSharpIcon />
                    </Button>
                  </Box>
                  <Box width={60} pt={1}>
                    <TextField
                      error={errorMessageTextfield.length !== 0}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
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
                  <Box pt={1.3}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        countItem > 0 && setCountItem((prev) => prev + 1);
                      }}
                    >
                      <AddSharpIcon />
                    </Button>
                  </Box>

                  <Box pt={1.3}>
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
                  </Box>
                  {ingredient.shoppingListQuantity !== null && (
                    <Box zIndex={1}>
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
                            bgcolor: lightGreen[500],
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
                    </Box>
                  )}
                </Stack>
              </>
            )}
          </>
        )}
        {!isInStock && (
          <>
            {visibility === "hidden" ? (
              <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
                <Skeleton variant="circular" width={60} height={60} />
              </Stack>
            ) : (
              <>
                <Stack spacing={2} direction="row">
                  <Box pt={1.3}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        countItem > 1 && setCountItem((prev) => prev - 1);
                      }}
                    >
                      <RemoveSharpIcon />
                    </Button>
                  </Box>
                  <Box width={60} pt={1}>
                    <TextField
                      error={errorMessageTextfield.length !== 0}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
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
                  <Box pt={1.3}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        countItem > 0 && setCountItem((prev) => prev + 1);
                      }}
                    >
                      <AddSharpIcon />
                    </Button>
                  </Box>
                  <Box pt={1.3}>
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
                  </Box>
                  {ingredient.shoppingListQuantity !== null && (
                    <Box zIndex={1}>
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
                            bgcolor: lightGreen[500],
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
                    </Box>
                  )}
                </Stack>
              </>
            )}
          </>
        )}
      </Stack>
    </>
  );
}
