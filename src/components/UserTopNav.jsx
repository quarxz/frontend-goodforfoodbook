import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export function UserTopNav({
  theme,
  colorMode,
  onHandleOpenLoginDialog,
  onHandleClickOpenUserDialog,
  selectedValue,
}) {
  const { user, logout } = useContext(UserContext);
  const { addIngredients, addRecipeId } = useContext(IngredientContext);

  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Stack spacing={5} direction="row">
        {/* <Box p={0.8}>Logged in as: {`${selectedValue}`}</Box> */}
        {user ? (
          <Box p={0.1}>
            <Button onClick={onHandleClickOpenUserDialog}>
              Willkommen {`${user.name?.firstname} ${user.name?.lastname}`}
            </Button>
          </Box>
        ) : (
          ""
        )}
        <Box sx={{ border: "0px solid red" }}>
          {matches_lg && theme.palette.mode + " mode"}
          <IconButton sx={{ ml: 1, mr: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Box p={0.1}>
          {matches_lg && (
            <>
              {user ? (
                <Button LinkComponent={NavLink} to="/" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button
                  LinkComponent={NavLink}
                  to="/"
                  onClick={() => {
                    onHandleOpenLoginDialog();
                    addIngredients("");
                    addRecipeId("");
                  }}
                >
                  Login
                </Button>
                // <NavLink to="/login">Login</NavLink>
              )}
            </>
          )}
        </Box>
      </Stack>
    </>
  );
}
