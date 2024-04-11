import styles from "./RecipeDetails.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { RecipeContent } from "./RecipeContent";

export function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState();

  const { user } = useContext(UserContext);

  const { VITE_API_URL: url } = import.meta.env;

  const loadProducts = useCallback(async () => {
    console.log("load Data");
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/recipes/${id}`);
      console.log(data.recipe);
      // console.log(status);
      console.log(data.message);
      setRecipe(data.recipe);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h2>Recipe Details</h2>

      <RecipeContent recipe={recipe} isloading={isloading} />
    </>
  );
}
