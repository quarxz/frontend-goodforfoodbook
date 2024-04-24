import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

// const emailsx = ["falk@test.com", "issmal@test.com", "max@test.com"];

export function LoginDialog({ open, onClose, selectedValue }) {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emails, setEmails] = useState([]);

  const { VITE_API_URL: url } = import.meta.env;

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/users`);
      // console.log(data.users);
      // console.log(data.users.map((user) => user.email));
      // console.log(data.status);
      setEmails(data.users.map((user) => user.email));
    } catch (err) {
      setIsError(true);
      err && console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => handleListItemClick(email)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
