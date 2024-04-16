import { useContext, useState, useEffect, useCallback } from "react";

import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import SendIcon from "@mui/icons-material/Send";

export function AddIngredientPanel({ categories, ingredients, units, onUpdateStockList }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredientName, setSelectedIngredientName] = useState(null);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);
  const [selectedIngredientUnit, setSelectedIngredientUnit] = useState(null);
  const [countItem, setCountItem] = useState(1);
  const [isAddButtonDisabled, setAddButtonDisabled] = useState(true);

  const clearSelected = () => {
    setSelectedCategory(null);
    setSelectedIngredientName(null);
    setSelectedIngredientId(null);
    setSelectedIngredientUnit(null);
    setAddButtonDisabled(true);
    setCountItem(1);
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
            variant="outlined"
            onClick={() => {
              countItem > 1 && setCountItem((prev) => prev - 1);
            }}
          >
            -
          </Button>
          <Box p={2}>{countItem}</Box>
          <Button
            variant="outlined"
            onClick={() => {
              countItem > 0 && setCountItem((prev) => prev + 1);
            }}
          >
            +
          </Button>
        </Stack>

        <Autocomplete
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
            onUpdateStockList(selectedIngredientId, countItem);
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
