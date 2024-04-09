import styles from "./ShoppingBasket.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export function ShoppingBasket() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>Shopping Basket</h2>
    </>
  );
}
