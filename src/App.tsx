import { CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { theme } from "./theme";
import LaunchesPage from "./views/LaunchesPage";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <LaunchesPage />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
