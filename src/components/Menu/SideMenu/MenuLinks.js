import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RouteIcon from "@mui/icons-material/Route";


const menuLinks = [
  {
    text: "dashboard",
    to: "/dashboard",
    icon: <RouteIcon color="white" />,
  },
  {
    text: "First Item",
    icon: <PeopleAltOutlinedIcon color="white" />,
    expand: [
      { text: "some 1", to: "/assets/1" },
      { text: "some 2", to: "/assets/2" },
      { text: "some 3", to: "/assets/3" },
    ],
  },
  
];



export default menuLinks;
