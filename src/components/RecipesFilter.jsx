import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["salate", "pizza", "pasta", "linsen"];

export function RecipesFilter({ onClickFilter }) {
  const [isActiveFilterVegan, setIsActivFilterVegan] = useState(false);
  const [isActiveFilterEasy, setIsActiveFilterEasy] = useState(false);
  const [isActiveFilterFast, setIsActiveFilterFast] = useState(false);

  return (
    <>
      <Grid container p={2}>
        <Grid>
          <Button
            variant="text"
            id="vegetarisch"
            onClick={(e) => {
              setIsActivFilterVegan((isActiveFilterVegan) => !isActiveFilterVegan);
              onClickFilter(e);
            }}
            style={isActiveFilterVegan ? { fontWeight: 900 } : undefined}
          >
            Vegetarisch
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="text"
            id="einfach"
            onClick={(e) => {
              setIsActiveFilterEasy((isActiveFilterEasy) => !isActiveFilterEasy);
              onClickFilter(e);
            }}
            style={isActiveFilterEasy ? { fontWeight: 900 } : undefined}
          >
            Einfach
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="text"
            id="schnell"
            onClick={(e) => {
              setIsActiveFilterFast((isActiveFilterFast) => !isActiveFilterFast);
              onClickFilter(e);
            }}
            style={isActiveFilterFast ? { fontWeight: 900 } : undefined}
          >
            Schnell
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
