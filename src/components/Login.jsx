import styles from "./Login.module.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function Login() {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const [localUserName, setLocalUserName] = useState("");

  useEffect(() => {
    user && navigate("/");
  }, [user, user?.id]);

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
        <select onChange={(val) => setLocalUserName(val.target.value)}>
          <option value="">-</option>
          <option value="falk@test.com">Falk</option>
          <option value="sonja@test.com">Sonja</option>
          <option value="oleksii@test.com">Oleksii</option>
        </select>

        <input
          type="text"
          value={localUserName}
          // onChange={(event) => setLocalUserName(event.target.value)}
          onChange={(event) => setLocalUserName("falk@test.com")}
          // onChange={(event) => setLocalUserName("sonja@test.com")}
          // onChange={(event) => setLocalUserName("oleksii@test.com")}
        />

        {user ? "" : <button>Login</button>}
      </form>
    </>
  );
}
