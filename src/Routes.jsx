import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProptectedRoute";
import NetworkDetector from "./components/General/NetworkDetector";

import Registration from "./pages/Auth/Registration";
import Login from "./pages/Auth/Auth";
import Dashbord from "./pages/Dashboard/Dashboard";
import Agreement from "./pages/Agreement/Agreement";
import ResetPassword from "./pages/Auth/ResetPassword";
import NewPassword from "./pages/Auth/NewPassword";
import VerifyUser from "./pages/Auth/VerifyUser";
import InviteEmployees from "./pages/Auth/InviteEmployees";
import RegisterCompany from "./pages/Auth/RegisterCompany";

import Vehicles from "./pages/Assets/Vehicles";
import Drivers from "./pages/Assets/Drivers";
import Trailers from "./pages/Assets/Trailers";
import AddVehicle from "./pages/Assets/AddVehicle";
import AddDriver from "./pages/Assets/AddDriver";
import VehicleDetail from "./pages/Assets/VehicleDetail";

import Fueling from "./pages/Fueling/Fueling";

import Shippings from "./pages/Shippings/Shippings";
import AddShipping from "./pages/Shippings/AddShipping";

import NotFoundPage from "./pages/404";
import NoInternet from "./pages/NoInternet";



const pageRoutes = [
  { path: "*", element: <NotFoundPage /> },
  { path: "/no-internet", element: <NoInternet /> },

  {
    path: "",
    element: (
      <ProtectedRoute>
        <Dashbord />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashbord />
      </ProtectedRoute>
    ),
  },
  { path: "/registration", element: <Registration /> },
  { path: "/login", element: <Login /> },
  { path: "/agreement", element: <Agreement /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/new-password/:jwt", element: <NewPassword /> },
  { path: "/verify-user/:v/:uid", element: <VerifyUser /> },
  { path: "/invite-employees", element: <InviteEmployees /> },
  { path: "/register-company", element: <RegisterCompany /> },

  //{ path: "/assets/:asset", element: <Assets /> },

  {
    path: "/assets/vehicles",
    element: (
      <ProtectedRoute>
        <Vehicles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assets/drivers",
    element: (
      <ProtectedRoute>
        <Drivers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assets/trailers",
    element: (
      <ProtectedRoute>
        <Trailers />
      </ProtectedRoute>
    ),
  },
  { path: "/assets/new-vehicle", element: <AddVehicle /> },
  {
    path: "/assets/new-driver",
    element: (
      <ProtectedRoute>
        <AddDriver />
      </ProtectedRoute>
    ),
  },
  { path: "/assets/vehicle-detail/:id", element: <VehicleDetail /> },
  { path: "/fueling", element: <Fueling /> },

  {
    path: "/shippings",
    element: (
      <ProtectedRoute>
        <Shippings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/new-shipping",
    element: (
      <ProtectedRoute>
        <AddShipping />
      </ProtectedRoute>
    ),
  },
];

const AppRouter = () => {
  return (
    <NetworkDetector>
      <Routes>
        {pageRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </NetworkDetector>
  );
};
export default AppRouter;
