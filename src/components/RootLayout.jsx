import styles from "./RootLayout.module.css";
import { useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

export function RootLayout() {
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  return (
    <>
      <Box
        component="nav"
        sx={{
          pt: 4,
          border: "1px dashed grey",
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
            border: "1px dashed grey",

            maxWidth: "100%", // Default maxWidth for all breakpoints
            "@media (min-width:640px)": {
              maxWidth: "600px",
            },
            "@media (min-width:960px)": {
              maxWidth: "960px",
            },
            "@media (min-width:1280px)": {
              maxWidth: "1280px",
            },
            "@media (min-width:1920px)": {
              maxWidth: "1280px",
            },
          }}
        >
          <ul>
            <li title="Home">
              <NavLink className={getNavClass} to="/">
                Home
              </NavLink>
            </li>
            <li title="Login">
              {user ? (
                <NavLink className={getNavClass} to="/login" onClick={logout}>
                  Logout
                </NavLink>
              ) : (
                <NavLink className={getNavClass} to="/login">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          maxWidth: "100%", // Default maxWidth for all breakpoints
          "@media (min-width:640px)": {
            maxWidth: "600px",
          },
          "@media (min-width:960px)": {
            maxWidth: "960px",
          },
          "@media (min-width:1280px)": {
            maxWidth: "1280px",
          },
          "@media (min-width:1920px)": {
            maxWidth: "1280px",
          },
        }}
      >
        <Container
          sx={{
            p: 2,
            border: "1px dashed grey",
          }}
        >
          <Box sx={{ marginTop: 2 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
      <Box component="footer" sx={{ p: 2, border: "1px dashed grey" }}>
        <p>&copy; 2024 - falkking soft</p>
      </Box>
    </>
  );
}
