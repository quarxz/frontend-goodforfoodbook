import styles from "./Home.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export function Home() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <h2>Home</h2>
      {user ? (
        <p>Logged in as: {`${user.name?.firstname} ${user.name?.lastname}`}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
}
