import { useContext, useRef, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { ShoppingListContext } from "../context/ShoppingListContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";

import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function UserListsNav() {
  const { user, logout } = useContext(UserContext);
  const { shoppingListContext } = useContext(ShoppingListContext);

  return (
    <>
      <Grid
        container
        // direction="row"
        spacing={2}
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          display: "flex",
          justifyContent: "flex-end",
        }}
        // sx={{
        //   padding: "0 0 2em 0",
        // }}
      >
        <Grid>
          <Button
            variant="outlined"
            component={NavLink}
            to="/stocklist"
            sx={{ "color:active": "red", display: { xs: "none", lg: "inline-block" } }}
          >
            Bestand
          </Button>
        </Grid>
        <Grid>
          <Badge badgeContent={shoppingListContext} color="primary">
            <Button variant="outlined" component={NavLink} to="/shoppinglist">
              Shopping List
            </Button>
          </Badge>
        </Grid>
        {/* <Grid> */}
        {/* <Button variant="outlined" component={NavLink} to="/shoppingbasket"> */}
        {/* <Button variant="outlined" onClick={onHandleCreatePDF}> */}
        {/* Kontakt */}
        {/* </Button> */}
        {/* </Grid> */}
      </Grid>
    </>
  );
}
