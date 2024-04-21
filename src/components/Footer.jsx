import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useState, useContext, useEffect, useMemo, createContext, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { RecipesFilter } from "./RecipesFilter";
import { UserListsNav } from "./UserListsNav";
import { UserFabNav } from "./UserFabNav";
import Grid from "@mui/material/Unstable_Grid2";

import useMediaQuery from "@mui/material/useMediaQuery";

import { lightGreen, grey, red, orange, deepOrange, green, blue } from "@mui/material/colors";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import SendSharpIcon from "@mui/icons-material/SendSharp";

export function Footer() {
  return (
    <>
      <Box component="footer" sx={{ p: 3, borderTop: "0px dashed grey" }}>
        <Grid container spacing={3} direction="column" pt={10} pb={10} bgcolor={grey[900]}>
          <Grid>&copy; 2024 - falkking soft</Grid>
          <Grid container direction="column">
            <Grid>Follow us!</Grid>
            <Grid container direction="row" display="flex" justifyContent="center">
              <Grid>
                <Tooltip title="Facebook" placement="right-end">
                  <Fab
                    aria-label="Link to Facebook"
                    sx={{
                      "&:hover": {
                        bgcolor: red[600],
                      },
                    }}
                  >
                    <FacebookSharpIcon />
                  </Fab>
                </Tooltip>
              </Grid>
              <Grid>
                <Tooltip title="Instagramm´" placement="right-end">
                  <Fab
                    aria-label="Link to Instagram"
                    sx={{
                      "&:hover": {
                        bgcolor: red[600],
                      },
                    }}
                  >
                    <CameraAltSharpIcon />
                  </Fab>
                </Tooltip>
              </Grid>
              <Grid>
                <Tooltip title="Telegram" placement="right-end">
                  <Fab
                    aria-label="Link to Telegram"
                    sx={{
                      "&:hover": {
                        bgcolor: red[600],
                      },
                    }}
                  >
                    <SendSharpIcon />
                  </Fab>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid>Kontakt | Impressum</Grid>
        </Grid>
      </Box>
    </>
  );
}
