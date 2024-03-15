import { useTranslation } from "react-i18next";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RouteIcon from "@mui/icons-material/Route";

function Links() {
  const { t } = useTranslation();

  const links = [
    {
      text: t("sideMenu.shippings"),
      to: "/shippings",
      icon: <RouteIcon color="white" />,
    },
    {
      text: t("sideMenu.assets"),
      icon: <PeopleAltOutlinedIcon color="white" />,
      expand: [
        { text: t("sideMenu.drivers"), to: "/assets/drivers" },
        { text: t("sideMenu.vehicles"), to: "/assets/vehicles" },
        { text: t("sideMenu.trailers"), to: "/assets/trailers" },
      ],
    },
    {
      text: t("sideMenu.vehicles"),
      to: "/vehicles",
      icon: <LocalShippingOutlinedIcon color="white" />,
    },
    {
      text: t("sideMenu.counterparties"),
      to: "/counterparties",
      icon: <HandshakeOutlinedIcon color="white" />,
    },
    {
      text: t("sideMenu.documents"),
      to: "/documents",
      icon: <FileCopyOutlinedIcon color="white" />,
    },
  ];

  return links;
}

export default Links;
