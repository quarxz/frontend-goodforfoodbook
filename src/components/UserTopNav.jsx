import { useState, useContext, useEffect, useMemo, createContext } from "react";

import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export function UserTopNav({ theme, colorMode }) {
  const { user, logout } = useContext(UserContext);

  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Stack spacing={5} direction="row">
        {user ? (
          <Box p={0.8}>Logged in as: {`${user.name?.firstname} ${user.name?.lastname}`}</Box>
        ) : (
          ""
        )}
        <Box sx={{ border: "0px solid red" }}>
          {matches_lg && theme.palette.mode + " mode"}
          <IconButton sx={{ ml: 1, mr: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Box p={0.8}>
          {matches_lg && (
            <>
              {user ? (
                <NavLink to="/login" onClick={logout}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </>
          )}
        </Box>
      </Stack>
    </>
  );
}
