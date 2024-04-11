import styles from "./StockList.module.css";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function StockList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>StockList</h2>

      <Link onClick={() => navigate(-1)}>Back</Link>
    </>
  );
}
