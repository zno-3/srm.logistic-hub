import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RouteIcon from "@mui/icons-material/Route";
import { useTranslation } from "react-i18next";
import DashboardIcon from '@mui/icons-material/Dashboard';

const menuLinks = [
  {
    text: "pages.dashboard",
    to: "/dashboard",
    icon: <DashboardIcon  color="white" />,
  },
  {
    text: "pages.assets",
    icon: <LocalShippingOutlinedIcon  />,
    expand: [
      { text: "pages.drivers", to: "/assets/drivers" },
      { text: "pages.vehicles", to: "/assets/vehicles" },
      { text: "pages.trailers", to: "/assets/trailers" },
    ],
  },
  {
    text: "shippings",
    to: "/shippings",
    icon: <RouteIcon />
  },
  {
    text: "fueling",
    to: "/fueling",
    icon: <PeopleAltOutlinedIcon  />
  }
  
];



export default menuLinks;
