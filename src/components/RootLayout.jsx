import styles from "./RootLayout.module.css";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useState, useContext, useEffect, useMemo, createContext, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { RecipesFilter } from "./RecipesFilter";
import { UserListsNav } from "./UserListsNav";
import { UserFabNav } from "./UserFabNav";
import Grid from "@mui/material/Unstable_Grid2";

/**
 * https://mui.com/material-ui/customization/color/
 */
import useMediaQuery from "@mui/material/useMediaQuery";

import { purple, blue, red, pink, amber, grey, lightBlue, deepOrange } from "@mui/material/colors";

import MenuSharpIcon from "@mui/icons-material/MenuSharp";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { UserTopNav } from "./UserTopNav";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function RootLayout() {
  //   const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);

  /** */

  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);

  // handle scroll event
  const handleScroll = (elTopOffset, elHeight) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  // add/remove scroll event listener
  useEffect(() => {
    const header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  /** */

  const [userTheme, setUserTheme] = useState();
  const { user, logout } = useContext(UserContext);

  const { message } = useContext(MessageContext);

  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkTheme.matches) {
    console.log("Dark Theme!", prefersDarkTheme.matches);
  }
  const [mode, setMode] = useState(prefersDarkTheme.matches ? "dark" : "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
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
                  default: "#242424",
                  paper: "#242424",
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
      }),
    [mode]
  );

  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));

  // Drawer
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={6}>
            <Box
              component="nav"
              sx={{
                pt: 4,
                borderBottom: "0px dashed grey",
              }}
            >
              <Box
                style={{ marginTop: 0 }}
                sx={{
                  margin: "0 auto",
                  border: "0px dashed grey",
                  padding: "10px 0 20px 0",
                  maxWidth: "100%", // Default maxWidth for all breakpoints
                  maxWidth: { xs: "640px", sm: "960px", md: "960px", lg: "1200px", xl: "1500px" },
                  display: "flex",
                  justifyContent: "space-between",
                }}
                // className={styles.sticky}

                className={`${sticky.isSticky ? styles.sticky : ""}`}
                ref={headerRef}
              >
                <Box component="div" className={styles.logo}>
                  <NavLink className={getNavClass} to="/">
                    Good-for-FoodBook
                  </NavLink>
                </Box>

                {!matches_lg && (
                  <Grid
                    container
                    sx={{ flexDirection: "row" }}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Grid pt={0.8}>
                      <UserTopNav theme={theme} colorMode={colorMode} />
                    </Grid>

                    <Grid>
                      <IconButton aria-label="delete" size="large" onClick={toggleDrawer(true)}>
                        <MenuSharpIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}

                {matches_lg && (
                  <Box
                    sx={
                      sticky.isSticky
                        ? {
                            display: "flex",
                            flexDirection: "column",
                            gap: "0",
                          }
                        : {
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }
                    }
                    className="boxUserNav"
                  >
                    <Box
                      className="loginBtnCon"
                      pb={2}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <UserTopNav theme={theme} colorMode={colorMode} />
                    </Box>
                    <Box>
                      <UserListsNav />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              component="main"
              // sx={{
              //   maxWidth: "100%",
              //   "@media (min-width:640px)": {
              //     maxWidth: "600px",
              //   },
              //   "@media (min-width:960px)": {
              //     maxWidth: "960px",
              //   },
              //   "@media (min-width:1280px)": {
              //     maxWidth: "1280px",
              //   },
              //   "@media (min-width:1920px)": {
              //     maxWidth: "1280px",
              //   },

              // }}
              sx={{
                maxWidth: "100%",
                maxWidth: { xs: "640px", sm: "960px", md: "960px", lg: "1200px", xl: "1500px" },
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
                  {!matches_lg && (
                    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                      <Box p={5}>
                        <UserFabNav
                          onToggleDrawer={() => {
                            toggleDrawer(false);
                          }}
                        />
                      </Box>
                    </Drawer>
                  )}
                </Box>
              </Container>
            </Box>

            <Box component="footer" sx={{ p: 2, borderTop: "1px dashed grey" }}>
              <p>&copy; 2024 - falkking soft</p>
            </Box>
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
