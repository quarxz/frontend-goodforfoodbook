import { useContext, useState, useEffect, useCallback, decition } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";

import { useTheme } from "@mui/material/styles";
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

import EditOffSharpIcon from "@mui/icons-material/EditOffSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import SendIcon from "@mui/icons-material/Send";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

import { isElement } from "react-dom/test-utils";

import { lightGreen, grey, red, orange, deepOrange, green, teal } from "@mui/material/colors";

export function StockListIngredient({
  ingredient,
  onDeleteIngredientFromStockList,
  onAddIngredientToStockList,
  onOpenDialog,
}) {
  const [countItem, setCountItem] = useState(1);
  const [countElement, setCountElement] = useState(false);
  const [errorMessageTextfield, setErrorMessageTextfield] = useState("");
  const [visibility, setVisibility] = useState("hidden");

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const timer = setTimeout(() => {
    setVisibility("visible");
  }, 2000);

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
              p={1.3}
              pl={3}
              sx={{
                borderColor: theme.palette.secondary.main,
                backgroundColor: theme.palette.secondary.main,
                borderWidth: "1px",
                borderStyle: "solid",
                display: "flex",
                justifyContent: "space-between",
                visibility: visibility,
                cursor: "pointer",
                opacity: "0.9",
                zIndex: "1",
                "&:hover": {
                  border: theme.palette.secondary.light,
                  backgroundColor: theme.palette.secondary.light,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  opacity: "1",
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease-in-out ",
                },
              }}
              borderRadius={1}
              width="60%"
            >
              <Stack spacing={2}>
                <Grid container spacing={0}>
                  <Grid width={180} pt={1}>
                    {ingredient.name}
                  </Grid>
                  <Grid container direction="row">
                    <Grid width={50}>
                      <Box textAlign="right" pr={1}>
                        <Typography style={{ fontFamily: "Roboto-Black", fontSize: "1.5em" }}>
                          {ingredient.quantity}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid pt={1}>
                      {ingredient.category === "gewuerze" || ingredient.category === "kraeuter"
                        ? ""
                        : ingredient.unit}
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <Stack spacing={2} direction="row">
              <Box pt={1.7}>
                <Tooltip title="Zutat bearbeiten" placement="left">
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
              </Box>
              {countElement && (
                <Box>
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        countItem > 1 && setCountItem((prev) => prev - 1);
                      }}
                    >
                      <RemoveSharpIcon />
                    </Button>
                    <Box width={60}>
                      <TextField
                        error={errorMessageTextfield.length !== 0}
                        id="outlined-basic"
                        variant="outlined"
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
                        countItem < ingredient.quantity && setCountItem((prev) => prev + 1);
                      }}
                    >
                      <AddSharpIcon />
                    </Button>

                    <Tooltip
                      title="Der Bestandsliste hinzufügen"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 700 }}
                      placement="top"
                    >
                      <Button
                        onClick={() => {
                          onAddIngredientToStockList(ingredient._id, countItem);
                        }}
                        variant="outlined"
                      >
                        <SendIcon />
                      </Button>
                    </Tooltip>
                  </Stack>
                </Box>
              )}
              <Box pt={1.7}>
                <Tooltip title="Aus der Bestandliste löschen" placement="right-end">
                  <Button
                    onClick={() => {
                      if (countItem === ingredient.quantity) {
                        onOpenDialog(ingredient._id, countItem, true);
                      } else {
                        onDeleteIngredientFromStockList(ingredient._id, countItem);
                      }
                    }}
                    variant="outlined"
                    size="small"
                  >
                    <ClearSharpIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
}
