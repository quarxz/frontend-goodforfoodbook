import { useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import { lightGreen, grey, red, orange, deepOrange, green } from "@mui/material/colors";

import KeySharpIcon from "@mui/icons-material/KeySharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import ChecklistSharpIcon from "@mui/icons-material/ChecklistSharp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";

export function UserFabNav({ onToggleDrawer }) {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <Grid
        container
        // direction="row"
        spacing={2}
        sx={{ flexDirection: { xs: "column", lg: "row" } }}
        // sx={{
        //   padding: "0 0 2em 0",
        // }}
      >
        <Grid>
          {user ? (
            <Tooltip title="Logout" placement="left">
              <Fab
                sx={{
                  "&:hover": {
                    bgcolor: red[600],
                  },
                  bgcolor: red[400],
                }}
                component={NavLink}
                to="/login"
                aria-label="logout"
                onKeyDown={onToggleDrawer}
                onClick={logout}
              >
                <CloseSharpIcon />
              </Fab>
            </Tooltip>
          ) : (
            <Tooltip title="Login" placement="left">
              <Fab
                sx={{
                  "&:hover": {
                    bgcolor: green[600],
                  },
                  bgcolor: green[400],
                }}
                component={NavLink}
                to="/login"
                aria-label="login"
                onKeyDown={onToggleDrawer}
              >
                <KeySharpIcon />
              </Fab>
            </Tooltip>
          )}
        </Grid>
        <Divider orientation="horizontal" flexItem sx={{ borderColor: "#fff", margin: "1em 0" }} />
        <Grid>
          <Tooltip title="Home" placement="left">
            <Fab
              component={NavLink}
              to="/"
              aria-label="go to Start page"
              onKeyDown={onToggleDrawer}
            >
              <AppsSharpIcon />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Bestands Liste" placement="left">
            <Fab
              component={NavLink}
              to="/stocklist"
              aria-label="got to stock list"
              onKeyDown={onToggleDrawer}
            >
              <ChecklistSharpIcon />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Shopping Liste" placement="left">
            <Fab component={NavLink} to="/shoppinglist" aria-label="go to shopping list">
              <ShoppingCartCheckoutSharpIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}
