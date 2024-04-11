import styles from "./RecipesFilter.module.css";

import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export function RecipesFilter({ onClickFilter }) {
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ padding: "2em 0 2em 0" }}>
        <Button variant="outlined">Rezeptart</Button>
        <Button variant="outlined">Kategorie</Button>
        <Button variant="outlined">Ernährung</Button>
        <Button variant="text" id="vegetarisch" onClick={onClickFilter}>
          Vegetarisch
        </Button>
        <Button variant="text" id="einfach" onClick={onClickFilter}>
          Einach
        </Button>
        <Button variant="text" id="schnell" onClick={onClickFilter}>
          Schnell
        </Button>
      </Stack>
    </>
  );
}
