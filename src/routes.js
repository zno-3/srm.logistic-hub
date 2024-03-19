import Registration from "./pages/Auth/Registration";
import Login from "./pages/Auth/Auth";
import Dashbord from "./pages/Dashboard/Dashboard";
import Agreement from "./pages/Agreement/Agreement";
import ResetPassword from "./pages/Auth/ResetPassword";

export const authRoutes = [
  { path: "", element: <Dashbord /> },
  { path: "/dashboard", element: <Dashbord /> },
  { path: "/registration", element: <Registration /> },
  { path: "/login", element: <Login /> },
  { path: "/agreement", element: <Agreement /> },
  { path: "/reset-password", element: <ResetPassword /> }

];
