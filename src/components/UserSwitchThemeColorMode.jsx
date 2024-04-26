import { useState } from "react";

import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export function UserSwitchThemeColorMode({ colorTheme, theme, colorMode }) {
  const [state, setState] = useState(colorTheme === "dark" ? true : false);

  console.log(theme);

  const handleChange = (event) => {
    setState(event.target.checked);
    // handleSwitch(event.target.checked);
    colorMode.toggleColorMode();
  };

  console.log(colorTheme);
  return (
    <>
      {/* <FormControlLabel control={<Switch defaultChecked />} label="Dark Theme" /> */}
      <FormControlLabel
        control={<Switch checked={state} onChange={handleChange} value={state} />}
        label={"Dark Theme"}
      />
    </>
  );
}
