import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

export const theme = createTheme({
  palette,
  typography,
  direction: "ltr",
  spacing: 8,
});
