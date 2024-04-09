import styles from "./ShoppingList.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export function ShoppingList() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>Shopping List</h2>
    </>
  );
}
