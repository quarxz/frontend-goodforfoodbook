import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Login() {
  const { user, login } = useContext(UserContext);
  const [localUserName, setLocalUserName] = useState("");

  return (
    <>
      <h1>Good-for-FoodBook</h1>
      <h2>Login</h2>
      {user ? <p>{user.userName}</p> : <p>Not logged in</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          login(localUserName);
        }}
      >
        <input
          type="text"
          value={localUserName}
          onChange={(event) => setLocalUserName(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
