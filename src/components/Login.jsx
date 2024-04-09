import styles from "./Login.module.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <h1>Good-for-FoodBook</h1>
      <h2>Login</h2>
      {user ? <p>{user.email}</p> : <p>Not logged in</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          login(userEmail);
        }}
      >
        <select onChange={(val) => setUserEmail(val.target.value)}>
          <option value="">-</option>
          <option value="falk@test.com">Falk</option>
          <option value="anna@test.com">Anna</option>
          <option value="max@test.com">Max</option>
        </select>

        <input
          type="text"
          value={userEmail}
          onChange={(event) => setUserEmail("falk@test.com")}
          // onChange={(event) => setLocalUserName("anna@test.com")}
          // onChange={(event) => setLocalUserName("max@test.com")}
        />

        {user ? "" : <button>Login</button>}
      </form>
    </>
  );
}
