import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import SideMenu from "./components/Menu/SideMenu/SideMenu.jsx";
import theme from "./theme.js";

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
          <SideMenu />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
