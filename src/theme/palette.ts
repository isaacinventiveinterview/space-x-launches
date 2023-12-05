import { colors, PaletteOptions } from "@mui/material";

const white = "#FFFFFF";
const black = "#282828";

const palette: PaletteOptions = {
  common: { black, white },
  primary: {
    dark: "#848484",
    main: "#1C1F22",
    light: "#F4F6F8",
  },
  secondary: {
    contrastText: white,
    dark: "#373737",
    main: "#6F6F6F",
    light: "#9a9a9a",
  },
  info: {
    contrastText: white,
    dark: colors.cyan[900],
    main: colors.cyan[900],
    light: colors.cyan[800],
  },
  error: {
    light: "#FEF3F2",
    main: "#C1170A",
    dark: "#C1170A",
    contrastText: white,
  },
  background: {
    default: "#F4F6F8",
  },
};

export default palette;
