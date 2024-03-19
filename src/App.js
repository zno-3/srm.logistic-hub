import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import SideMenu from "./components/Menu/SideMenu/SideMenu.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import theme from "./theme.js";
import { CssBaseline } from "@mui/material";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "http:",
});

const App = () => {
  return (
    <AuthProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <CssBaseline />
        <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                backgroundColor: "#0E1C36",
              }}
            >
              <SideMenu />
              <Grid
                container
                sx={{
                  width: "100%",
                  position: "relative",
                  my: 2,
                  mr:2,
                  p: 2,
                  borderRadius: "14px",
                  background: "#F5F5F5",
                  overflow: "auto",
                }}
              >
                <AppRouter />
              </Grid>
            </Box>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
