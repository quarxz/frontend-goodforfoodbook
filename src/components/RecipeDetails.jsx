import styles from "./RecipeDetails.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";

export function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user, url } = useContext(UserContext);
  return (
    <>
      <h2>Recipe Details</h2>
      <h3>Details für Rezept: {id}</h3>
    </>
  );
}
