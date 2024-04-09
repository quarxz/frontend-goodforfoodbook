import styles from "./Login.module.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function Login() {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    user && navigate("/");
  }, [user, user?.id]);

  return (
    <>
      <h2>Login</h2>
      {user ? <p>{user.email}</p> : <p>Not logged in</p>}

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          mt: 5,
        }}
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          login(userEmail);
        }}
      >
        <Box sx={{ minWidth: 120, p: 1 }}>
          <FormControl sx={{ minWidth: 210 }}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userEmail}
              label="User"
              onChange={(val) => setUserEmail(val.target.value)}
            >
              <MenuItem value="falk@test.com">Falk</MenuItem>
              <MenuItem value="Anna@test.com">Anna</MenuItem>
              <MenuItem value="Max@test.com">Max</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, p: 1 }}>
          <FormControl sx={{ minWidth: 130 }}>
            <TextField
              id="outlined-basic"
              label={"Selected User"}
              variant="outlined"
              value={userEmail}
              onChange={(event) => setUserEmail("falk@test.com")}
              // onChange={(event) => setLocalUserName("anna@test.com")}
              // onChange={(event) => setLocalUserName("max@test.com")}
            />
          </FormControl>
        </Box>

        {user ? (
          ""
        ) : (
          <Box sx={{ minWidth: 120, p: 1 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <Button variant="contained" type="submit" sx={{ height: "3.9em" }}>
                Login
              </Button>
            </FormControl>
          </Box>
        )}
      </Box>
    </>
  );
}
