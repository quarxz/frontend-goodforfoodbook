import { useContext, useState, useEffect, useCallback } from "react";

import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import SendIcon from "@mui/icons-material/Send";

import axios from "axios";

export function AddIngredientPanel({ onUpdateIngredientsList }) {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredientName, setSelectedIngredientName] = useState(null);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);
  const [selectedIngredientUnit, setSelectedIngredientUnit] = useState(null);
  const [countItem, setCountItem] = useState(1);
  const [isAddButtonDisabled, setAddButtonDisabled] = useState(true);
  const [isAutocompleteDisabled, setAutocompleteDisabled] = useState(true);

  const [errorMessageTextfield, setErrorMessageTextfield] = useState("");

  const { VITE_API_URL: url } = import.meta.env;
  const user_id = "65e5a98c3fd0f135269eabac";

  const loadIngredients = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/ingredients`);
      // console.log(data.ingredients);
      console.log(data.message);
      setIngredients(
        data.ingredients.map((ingredient) => {
          return { ...ingredient, label: ingredient.name };
        })
      );
      setCategories(
        data.ingredients.map((ingredient) => {
          return { label: ingredient.category };
        })
      );
      setUnits(
        data.ingredients.map((ingredient) => {
          return { name: ingredient.name, label: ingredient.unit };
        })
      );
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIngredients();
  }, []);

  const clearSelected = () => {
    setSelectedCategory(null);
    setSelectedIngredientName(null);
    setSelectedIngredientId(null);
    setSelectedIngredientUnit(null);
    setAddButtonDisabled(true);
    setCountItem(1);
    setAutocompleteDisabled(true);
  };

  return (
    <>
      <Stack spacing={3} direction="row">
        <Autocomplete
          disablePortal
          disableClearable
          value={selectedCategory}
          onChange={(event, newValue) => {
            setSelectedCategory(newValue.label);
            setAutocompleteDisabled(false);
          }}
          id="combo-categories"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={categories.filter(
            (obj, index, self) => index === self.findIndex((o) => o.label === obj.label)
          )}
          sx={{ width: 230 }}
          renderInput={(params) => <TextField {...params} label="Kategorie" />}
        />
        <Autocomplete
          disabled={isAutocompleteDisabled}
          disablePortal
          disableClearable
          value={selectedIngredientName}
          onChange={(event, newValue) => {
            setSelectedIngredientName(newValue?.name);
            setSelectedIngredientId(newValue?._id);
            setSelectedIngredientUnit(newValue?.unit);

            // selectedIngredientId === undefined && setAddButtonDisabled(true);
          }}
          onSelect={(e) => {
            console.log(e.target.value);
            setAddButtonDisabled(false);
            // e.target.value == " " && setAddButtonDisabled(true);
          }}
          id="combo-ingredients"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={ingredients.filter((obj) => {
            return obj.category === selectedCategory;
          })}
          sx={{ width: 230 }}
          renderInput={(params) => <TextField {...params} label="Zutat" />}
        />

        <Stack spacing={3} direction="row">
          <Button
            disabled={isAutocompleteDisabled}
            variant="outlined"
            onClick={() => {
              countItem > 1 && setCountItem((prev) => prev - 1);
            }}
          >
            -
          </Button>
          <Box width={60}>
            <TextField
              disabled={isAutocompleteDisabled}
              error={errorMessageTextfield.length !== 0}
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "60px" }}
              inputProps={{ min: 1, style: { textAlign: "right" }, maxLength: 3 }}
              value={countItem}
              onChange={(event) => {
                const onlyNumb = event.target.value.replace(/[^0-9]/g, "0");
                console.log(event.target.value.length);
                if (isNaN(parseInt(onlyNumb))) {
                  setCountItem(0);
                } else {
                  setCountItem(parseInt(onlyNumb));
                }

                // event.target.value === 0 ? setCountItem(0) : setCountItem(onlyNumb);

                event.target.value === ""
                  ? setErrorMessageTextfield("Error!")
                  : setErrorMessageTextfield("");
              }}
              label={errorMessageTextfield}
            />
          </Box>
          <Button
            disabled={isAutocompleteDisabled}
            variant="outlined"
            onClick={() => {
              countItem > 0 && setCountItem((prev) => prev + 1);
            }}
          >
            +
          </Button>
        </Stack>

        <Autocomplete
          disabled={isAutocompleteDisabled}
          disablePortal
          disableClearable
          readOnly
          value={selectedIngredientUnit}
          onChange={(e) => {
            setSelectedIngredientUnit(null);
          }}
          id="combo-units"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={units.filter((obj) => {
            return obj.name === selectedIngredientName;
          })}
          sx={{ width: 230 }}
          renderInput={(params) => <TextField {...params} label="Einheit" />}
        />

        <Button
          variant="outlined"
          onClick={() => {
            onUpdateIngredientsList(selectedIngredientId, countItem);
            // loadIngredientsFromStock();
            clearSelected();
          }}
          endIcon={<SendIcon />}
          disabled={isAddButtonDisabled}
        >
          Add{" "}
        </Button>
      </Stack>
    </>
  );
}
