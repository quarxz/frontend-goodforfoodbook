import styles from "./StockList.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export function StockList() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>StockList</h2>
    </>
  );
}
