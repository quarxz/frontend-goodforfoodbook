import styles from "./RootLayout.module.css";
import { useContext, useEffect, useMemo, createContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { RecipesFilter } from "./RecipesFilter";
import { UserListsNav } from "./UserListsNav";

/**
 * https://mui.com/material-ui/customization/color/
 */
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, blue, red, pink, amber, grey, lightBlue } from "@mui/material/colors";

export function RootLayout() {
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          //   primary: {
          //     main: lightBlue[500],
          //   },
          //   secondary: {
          //     main: red[500],
          //   },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="nav"
          sx={{
            pt: 4,
            borderBottom: "1px dashed grey",
          }}
        >
          <Box
            component="div"
            sx={{
              margin: "0 auto",
              border: "0px dashed grey",

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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box component="div" className={styles.logo}>
              <NavLink className={getNavClass} to="/">
                Good-for-FoodBook
              </NavLink>
            </Box>

            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
              className="boxUserNav"
            >
              <Box
                component="div"
                className="loginBtnCon"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ul>
                  <li>
                    {user ? (
                      <p>Logged in as: {`${user.name?.firstname} ${user.name?.lastname}`}</p>
                    ) : (
                      ""
                    )}
                  </li>
                  <li>
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
              <Box component="div">
                <UserListsNav />
              </Box>
            </Box>
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
              pl: 10,
              pr: 10,
              border: "0px dashed grey",
            }}
          >
            <Box sx={{ marginTop: 2 }}>
              <RecipesFilter />
              <h1>Good-for-FoodBook</h1>
              <Outlet />
            </Box>
          </Container>
        </Box>
        <Box component="footer" sx={{ p: 2, border: "1px dashed grey" }}>
          <p>&copy; 2024 - falkking soft</p>
        </Box>
      </ThemeProvider>
    </>
  );
}
