import { useContext, useState, useEffect } from "react";

import { UserContext } from "../context/UserContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { dark } from "@mui/material/styles/createPalette";

const label = { inputProps: { "aria-label": "Switch demo" } };

export function UserDialog({ open, onHandleCloseUserDialog }) {
  const { user } = useContext(UserContext);

  const [colorTheme, setColorTheme] = useState(user?.colorTheme === "dark" ? true : false);
  //   console.log(user?.address);
  return (
    <>
      {/* <Button variant="outlined" onClick={onHandleClickOpen}>
        Open full-screen dialog
      </Button> */}
      {/* <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}> */}
      <Dialog fullScreen open={open} onClose={onHandleCloseUserDialog} sx={{ padding: "1em" }}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onHandleCloseUserDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography> */}
            <Button autoFocus color="inherit" onClick={onHandleCloseUserDialog}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        {/* <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItemButton>
        </List> */}
        <Grid container spacing={1} direction="column" ml={10} mt={10}>
          <Grid container direction="row">
            <Grid width={100}>Name:</Grid>
            <Grid width={200}>{user?.name?.firstname}</Grid>
          </Grid>
          <Grid container direction="row">
            <Grid width={100}>Nachname:</Grid>
            <Grid width={200}>{user?.name?.lastname}</Grid>
          </Grid>
          <Grid container direction="row">
            <Grid width={100}>eMail:</Grid>
            <Grid width={200}>{user?.email}</Grid>
          </Grid>

          <Grid container direction="row" mt={3}>
            <Grid width={100}>Strasse:</Grid>
            <Grid width={200}>{`${user?.address?.street} ${user?.address?.number}`}</Grid>
          </Grid>
          <Grid container direction="row">
            <Grid width={100}>PLZ/Ort:</Grid>
            <Grid width={400}>{`${user?.address?.postcode} ${user?.address?.city}`}</Grid>
          </Grid>

          <Grid container direction="row" mt={3}>
            <Grid width={100}>Ernährung:</Grid>
            <Grid width={200}>{user?.primaryNutrationType}</Grid>
          </Grid>

          <Grid container direction="row" mt={3}>
            <Grid width={100}>Mitglied:</Grid>
            <Grid width={200}>{user?.activeMember ? "ja" : "nein"}</Grid>
          </Grid>

          <Grid container direction="row" mt={3}>
            <Grid width={100}>Theme:</Grid>
            <Grid width={200}>{user?.colorTheme}</Grid>
          </Grid>

          <Grid container direction="column" mt={3}>
            <Grid>
              <FormControlLabel control={<Switch defaultChecked />} label="Dark Theme" />
            </Grid>
            <Grid>
              <FormControlLabel control={<Switch />} label="Light Theme" />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
