import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";

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
import { BorderStyle } from "@mui/icons-material";

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

const names = ["einfach", "schnell", "gesund", "günstig", "klassisch"];

export function SelectBoxRecipeType({ onhandleChangeRecipeType, filterRecipeType }) {
  const theme = useTheme();
  return (
    <>
      <Grid>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-checkbox-label">Rezeptart</InputLabel>
          <Select
            labelId="recipeType"
            id="recipeType"
            multiple
            value={filterRecipeType}
            onChange={onhandleChangeRecipeType}
            input={<OutlinedInput label="Rezeptart" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filterRecipeType.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
