import styles from "./RootLayout.module.css";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import {
  useState,
  useContext,
  useEffect,
  useMemo,
  createContext,
  useRef,
  useCallback,
} from "react";
import { Outlet, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
import { SnackbarProvider, useSnackbar } from "notistack";

import Drawer from "@mui/material/Drawer";
import { LoginDialog } from "./LoginDialog";
import { UserDialog } from "./UserDialog";

import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Typography from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { RecipesFilter } from "./RecipesFilter";
import { UserListsNav } from "./UserListsNav";
import { UserFabNav } from "./UserFabNav";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

/**
 * https://mui.com/material-ui/customization/color/
 */
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  purple,
  blue,
  red,
  pink,
  amber,
  grey,
  lightBlue,
  deepOrange,
  cyan,
  teal,
} from "@mui/material/colors";

import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
// import ArrowCircleUpSharpIcon from "@mui/icons-material/ArrowCircleUpSharp";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";

import { UserTopNav } from "./UserTopNav";
import { Footer } from "./Footer";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function RootLayout() {
  //   const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);

  /** To Top Button */

  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollButton = () => {
      window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", handleScrollButton);
    return () => {
      window.addEventListener("scroll", handleScrollButton);
    };
  }, []);

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
  const { user, login } = useContext(UserContext);

  const { message } = useContext(MessageContext);

  let prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (prefersDarkTheme.matches) {
    console.log("Dark Theme!", prefersDarkTheme.matches);
  }
  const [mode, setMode] = useState(prefersDarkTheme.matches ? "dark" : "light");
  // console.log(user?.colorTheme);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        console.log("mode mode mode");
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
            ...(mode === "dark"
              ? {
                  // main: blue[300],
                  light: blue[100],
                  main: blue[300],
                  dark: blue[500],
                  contrastText: "#fff",
                }
              : { light: pink[100], main: pink[800], dark: pink[500], contrastText: "#fff" }),
          },
          secondary: {
            ...(mode === "dark"
              ? {
                  // main: blue[300],
                  light: grey[800],
                  main: blue[300],
                  dark: blue[500],
                  contrastText: "#fff",
                }
              : { light: teal[100], main: teal[200], dark: teal[400], contrastText: "#fff" }),
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
                  default: grey[200],
                  paper: pink[300],
                },
              }),
          text: {
            ...(mode === "dark"
              ? {
                  primary: grey[200],
                  secondary: grey[200],
                }
              : {
                  primary: grey[900],
                  secondary: grey[900],
                }),
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    // console.log(user?.colorTheme, mode, prefersDarkTheme.matches);
    if (user && user?.colorTheme === "light") {
      colorMode.toggleColorMode();
    }
    if (user && user?.colorTheme === undefined && prefersDarkTheme.matches === false) {
      colorMode.toggleColorMode();
    }
    if (user && user?.colorTheme !== "" && prefersDarkTheme.matches === false) {
      colorMode.toggleColorMode();
    }
    if (prefersDarkTheme.matches === false) {
      colorMode.toggleColorMode();
    }
    if (!user && mode === "light") {
      colorMode.toggleColorMode();
    }
  }, [user, theme.mode]);

  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));

  // Drawer
  const [openDrawerSideNav, setOpenDrawerSideNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawerSideNav(newOpen);
  };

  // Login Dialog
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOpenLoginDialog = (val) => {
    setOpenLoginDialog(val);
  };

  const handleClose = (val) => {
    console.log("handleClose");
    setOpenLoginDialog(false);
    setOpenDrawerSideNav(false);
    if (val !== "") {
      setSelectedValue(val);
      login(val);
    }
  };

  // User Dialog
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const handleClickOpenUserDialog = (val) => {
    console.log("open user Dialog");
    setOpenUserDialog(val);
  };
  const handleCloseUserDialog = (val) => {
    setOpenUserDialog(val);
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <SnackbarProvider maxSnack={3}>
            <Box
              zIndex="50"
              component="nav"
              sx={{
                pt: 4,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                height: 170,
              }}
              className={`${sticky.isSticky ? styles.sticky : ""}`}
              // style={{ backgroundColor: theme.palette.secondary.dark }}
              // style={{ backgroundColor: theme.palette.primary.main }}
              style={
                theme.palette.mode === "dark"
                  ? { backgroundColor: grey[900] }
                  : { backgroundColor: teal[200] }
              }
              ref={headerRef}
            >
              <Box
                className={styles.innerNavBox}
                style={{ marginTop: 0 }}
                sx={{
                  margin: "0 auto",
                  padding: "10px 0 0 0",
                  maxWidth: "100%", // Default maxWidth for all breakpoints
                  maxWidth: { xs: "640px", sm: "960px", md: "960px", lg: "1200px", xl: "1500px" },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box component="div" className={styles.logo}>
                  <NavLink to="/">
                    <Typography sx={{ textShadow: " 1px 1px 5px #242424;" }}>
                      Good-for-FoodBook
                    </Typography>
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
                      <IconButton
                        aria-label="open navigation"
                        size="large"
                        onClick={toggleDrawer(true)}
                      >
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
                      <UserTopNav
                        theme={theme}
                        colorMode={colorMode}
                        onHandleOpenLoginDialog={() => {
                          handleOpenLoginDialog(true);
                        }}
                        onHandleClickOpenUserDialog={() => {
                          handleClickOpenUserDialog(true);
                        }}
                        selectedValue={selectedValue}
                      />
                    </Box>
                    <Box>{user ? <UserListsNav /> : ""}</Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              component="main"
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
                  scrollBehavior: "smooth",
                }}
              >
                <Box sx={{ marginTop: 0 }}>
                  {/* <h1>Good-for-FoodBook</h1> */}

                  <Outlet />
                  <LoginDialog
                    selectedValue={selectedValue}
                    open={openLoginDialog}
                    onClose={handleClose}
                  />
                  {!matches_lg && (
                    <Drawer open={openDrawerSideNav} onClose={toggleDrawer(false)} anchor="right">
                      <Box p={5}>
                        <UserFabNav
                          onToggleDrawer={() => {
                            setOpenDrawerSideNav(false);
                          }}
                          onHandleOpenLoginDialog={() => {
                            handleOpenLoginDialog(true);
                          }}
                        />
                      </Box>
                    </Drawer>
                  )}
                </Box>
                {showButton && (
                  <Box
                    className={"scrolltotop"}
                    sx={{ position: "absolute", right: "20px", bottom: "-150px" }}
                  >
                    <Fab color="primary" aria-label="to top button" onClick={handleScrollToTop}>
                      <KeyboardArrowUpSharpIcon />
                    </Fab>
                  </Box>
                )}
                <UserDialog
                  open={openUserDialog}
                  onHandleCloseUserDialog={() => handleCloseUserDialog(false)}
                  theme={theme}
                  colorMode={colorMode}
                />
              </Container>
            </Box>

            <Footer />
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
