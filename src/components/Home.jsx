import styles from "./Home.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Good-for-FoodBook</h1>
      <h2>Home</h2>
      {user ? <p>Logged in as: {user.userName}</p> : <p>Not logged in</p>}
    </>
  );
}
