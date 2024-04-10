import styles from "./RecipesFilter.module.css";

import { useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export function RecipesFilter() {
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ padding: "0 0 2em 0" }}>
        <Button variant="outlined">Rezeptart</Button>
        <Button variant="outlined">Kategorie</Button>
        <Button variant="outlined">Ernährung</Button>
      </Stack>
    </>
  );
}
