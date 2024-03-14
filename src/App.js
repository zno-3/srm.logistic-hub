import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import { ThemeProvider } from "@mui/material/styles";
import  AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import theme from "./theme.js";

  const store = createStore({
    authName: "_auth",
    authType: "localstorage",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:'
  });

const App = () => {
  return (
    <AuthProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
