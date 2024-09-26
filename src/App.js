

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "react-auth-kit/AuthProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import createStore from "react-auth-kit/createStore";
//import createRefresh from "react-auth-kit/createRefresh";
//import refresh from "./pages/Auth/refresh.js";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";
import theme from "./theme.js";
import { DrawerProvider } from "./context/SideMenuProvider.jsx";


import { CustomUIProvider } from "./context/CustomIUProvider.jsx";



import AppRouter from "./Routes.jsx";


const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "http:",
  //refresh: refresh
});
//const refreshApi = createRefresh({
//  interval: 0.1, // Час між оновленнями в хвилинах
//  refreshApiCallback:  refresh// Ваша функція для оновлення токенів
//});

const App = () => {


  return (
    <AuthProvider store={store} >
      <ThemeProvider theme={theme}>
        <CustomUIProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
            <DrawerProvider>
              <CssBaseline />
              <Box
                sx={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  flexGrow: 1,
                  backgroundColor: "#0E1C36",
                }}
              >
                <AppRouter />
              </Box>
              </DrawerProvider>
            </BrowserRouter>
          </LocalizationProvider>
        </CustomUIProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
