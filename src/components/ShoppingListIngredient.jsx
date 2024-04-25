import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";

import { Box, Button, Stack } from "@mui/material";
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

import EditOffSharpIcon from "@mui/icons-material/EditOffSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import SendIcon from "@mui/icons-material/Send";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";

export function ShoppingListIngredient({
  ingredient,
  onDeleteIngredientFromShoppingList,
  onAddIngredientToShoppingList,
  onOpenDialog,
}) {
  const [countItem, setCountItem] = useState(1);
  const [countElement, setCountElement] = useState(false);
  const [errorMessageTextfield, setErrorMessageTextfield] = useState("");
  const [visibility, setVisibility] = useState("hidden");

  const { enqueueSnackbar } = useSnackbar();

  const timer = setTimeout(() => {
    setVisibility("visible");
  }, 1000);

  return (
    <>
      {visibility === "hidden" ? (
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rectangular" animation="wave" width="60%" height={60} />
          <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
          <Skeleton variant="rectangular" animation="wave" width={60} height={60} />
        </Stack>
      ) : (
        <>
          <Stack spacing={2} direction="row">
            <Box
              p={2}
              pl={3}
              sx={{
                borderColor: grey[800],
                borderWidth: "1px",
                borderStyle: "solid",
                display: "flex",
                justifyContent: "space-between",
              }}
              borderRadius={1}
              width="60%"
            >
              <Stack spacing={2} direction="row">
                <Grid container spacing={0}>
                  <Grid width={180}>{ingredient.name}</Grid>
                  <Grid width={50}>
                    <Box textAlign="right" pr={1}>
                      {ingredient.quantity}
                    </Box>
                  </Grid>
                  <Grid>
                    {ingredient.category === "gewuerze" || ingredient.category === "kraeuter"
                      ? ""
                      : ingredient.unit}
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <Stack spacing={2} direction="row">
              <Tooltip title="Zutat bearbeiten" placement="top">
                <Button
                  onClick={() => {
                    setCountElement((isElementOpen) => !isElementOpen);
                    setCountItem(1);
                  }}
                  variant="outlined"
                  size="small"
                >
                  {countElement ? (
                    <EditOffSharpIcon fontSize="small" />
                  ) : (
                    <EditSharpIcon fontSize="small" />
                  )}
                </Button>
              </Tooltip>
              {countElement && (
                <Box>
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
                            enqueueSnackbar("Muss größer als 0 sein!", { variant: "error" });
                          } else {
                            setCountItem(parseInt(onlyNumb));
                          }
                          event.target.value > ingredient.quantity &&
                            setCountItem(ingredient.quantity);
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

                    <Tooltip
                      title="Der Bestandsliste hinzufügen"
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
                  </Stack>
                </Box>
              )}

              <Tooltip title="Aus der Bestandliste löschen" placement="right-end">
                <Button
                  onClick={() => {
                    if (countItem === ingredient.quantity) {
                      onOpenDialog(ingredient._id, countItem, true);
                    } else {
                      onDeleteIngredientFromShoppingList(ingredient._id, countItem);
                    }
                  }}
                  variant="outlined"
                  size="small"
                >
                  <ClearSharpIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
}
