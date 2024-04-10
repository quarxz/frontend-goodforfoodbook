import { useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Breadcrumbs } from "@mui/material";

export function UserListsNav(params) {
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ padding: "0 0 2em 0" }}>
        <Button
          variant="outlined"
          component={NavLink}
          to="/stocklist"
          sx={{ "color:active": "red" }}
        >
          Bestand
        </Button>
        <Button variant="outlined" component={NavLink} to="/shoppinglist">
          Shopping List
        </Button>
        <Button variant="outlined" component={NavLink} to="/shoppingbasket">
          Basket
        </Button>
      </Stack>
    </>
  );
}
