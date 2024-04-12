import styles from "./RootLayout.module.css";
import { useState, useContext, useEffect, useMemo, createContext } from "react";
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
import { purple, blue, red, pink, amber, grey, lightBlue, deepOrange } from "@mui/material/colors";

import CssBaseline from "@mui/material/CssBaseline";

export function RootLayout() {
  //   const theme = useTheme();
  const [userTheme, setUserTheme] = useState();
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...amber,
        ...(mode === "dark"
          ? {
              main: blue[300],
            }
          : { main: pink[100] }),
      },
      ...(mode === "dark"
        ? {
            background: {
              default: grey[900],
              paper: grey[900],
            },
          }
        : {
            background: {
              default: pink[900],
              paper: pink[900],
            },
          }),
      text: {
        ...(mode === "light"
          ? {
              primary: grey[900],
              secondary: grey[900],
            }
          : {
              primary: grey[200],
              secondary: grey[200],
            }),
      },
    },
  });

  //   const theme = createTheme({
  //     palette: {
  //       background: {
  //         default: grey[900],
  //         paper: grey[900],
  //       },
  //     },
  //   });

  //   const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  //   const darkModeTheme = createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light"));

  //   const theme = useMemo(
  //     () =>
  //       createTheme({
  //         palette: {
  //           mode: prefersDarkMode ? "dark" : "light",
  //         },
  //       }),
  //     [prefersDarkMode]
  //   );

  let mode = createTheme(getDesignTokens());
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkTheme.matches) {
    console.log("Dark Theme!", prefersDarkTheme.matches);
    mode = createTheme(getDesignTokens("dark"));
  }

  const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
  if (prefersLightTheme.matches) {
    console.log("Light Theme!", prefersLightTheme.matches);
    mode = createTheme(getDesignTokens("light"));
  }

  return (
    <>
      <ThemeProvider theme={mode}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{
            pt: 4,
            borderBottom: "0px dashed grey",
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

                "@media (min-width:640px)": {
                  display: "none",
                },
                "@media (min-width:960px)": {
                  display: "none",
                },
                "@media (min-width:1280px)": {
                  display: "inline",
                },
              }}
              className="boxUserNav"
            >
              <Box
                component="div"
                className="loginBtnCon"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Stack spacing={2} direction="row" sx={{ padding: ".5em 0 " }}>
                  {user ? (
                    <p>Logged in as: {`${user.name?.firstname} ${user.name?.lastname}`}</p>
                  ) : (
                    ""
                  )}

                  {user ? (
                    <NavLink className={getNavClass} to="/login" onClick={logout}>
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink className={getNavClass} to="/login">
                      Login
                    </NavLink>
                  )}
                </Stack>
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
              border: "0px dashed  rgba(116, 123, 255, .5)",
              position: "relative",
            }}
          >
            <Box sx={{ marginTop: 0 }}>
              <h1>Good-for-FoodBook</h1>
              <Outlet />
            </Box>
          </Container>
        </Box>
        <Box component="footer" sx={{ p: 2, borderTop: "1px dashed grey" }}>
          <p>&copy; 2024 - falkking soft</p>
        </Box>
      </ThemeProvider>
    </>
  );
}
