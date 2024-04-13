import styles from "./StockList.module.css";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IngredientContext } from "../context/IngredientContext";
import { Box } from "@mui/material";

export function StockList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { ingredients } = useContext(IngredientContext);
  console.log(ingredients);
  return (
    <>
      <h2>StockList</h2>

      <Box>
        <Link onClick={() => navigate(-1)}>Back</Link>
      </Box>

      {ingredients.map((ingredient, index) => {
        return (
          <>
            <Box key={index}>{ingredient.ingredient.name}</Box>
            <Box key={index}>{ingredient.quantity}</Box>
            <Box key={index}>{ingredient.ingredient.unit}</Box>
          </>
        );
      })}
    </>
  );
}
