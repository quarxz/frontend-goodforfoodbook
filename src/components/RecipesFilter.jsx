import styles from "./RecipesFilter.module.css";

import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["salate", "pizza", "pasta", "linsen"];

export function RecipesFilter({ onClickFilter }) {
  const [isActiveFilterVegan, setIsActivFilterVegan] = useState(false);
  const [isActiveFilterEasy, setIsActiveFilterEasy] = useState(false);
  const [isActiveFilterFast, setIsActiveFilterFast] = useState(false);

  return (
    <>
      {/* <Grid container spacing={3} sx={{ padding: "2em 0 2em 0" }}> */}
      <Grid container>
        <Grid>
          <Button
            variant="text"
            id="vegetarisch"
            onClick={(e) => {
              setIsActivFilterVegan((isActiveFilterVegan) => !isActiveFilterVegan);
              onClickFilter(e);
            }}
            style={isActiveFilterVegan ? { fontWeight: 900 } : undefined}
          >
            Vegetarisch
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="text"
            id="einfach"
            onClick={(e) => {
              setIsActiveFilterEasy((isActiveFilterEasy) => !isActiveFilterEasy);
              onClickFilter(e);
            }}
            style={isActiveFilterEasy ? { fontWeight: 900 } : undefined}
          >
            Einfach
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="text"
            id="schnell"
            onClick={(e) => {
              setIsActiveFilterFast((isActiveFilterFast) => !isActiveFilterFast);
              onClickFilter(e);
            }}
            style={isActiveFilterFast ? { fontWeight: 900 } : undefined}
          >
            Schnell
          </Button>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  );
}
