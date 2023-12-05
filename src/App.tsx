import { ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "./theme";
import LaunchesPage from "./views/LaunchesPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LaunchesPage />
    </ThemeProvider>
  );
}

export default App;
