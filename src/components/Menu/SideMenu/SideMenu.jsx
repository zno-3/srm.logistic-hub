import { Divider, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Collapse,
  Typography,
} from "@mui/material";

import {useLinks} from "./links";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import SwitchLang from "../../LangSwitch/LangSwitch"
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex",
  padding: theme.spacing(1, 2),
  ...theme.mixins.toolbar,
}));

const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


function SideMenu () {
  const { t } = useTranslation();

  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [openExpand, setOpenExpand] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const ExpandedItems = (props) => {
    return props.items.map((item, index) => (
      <List disablePadding dense={true}>
        <ListItemButton component={Link} to={item.to} sx={{ pl: 6}}>
          <ListItemText primary={item.text}  sx={{
        color: 'lightgrey', 
      }} />
        </ListItemButton>
      </List>
    ));
  };

  const handleExpand = () => {
    setOpenExpand(!openExpand);
  };

  const links = useLinks();
  console.log(links);

  return (
    <>
      <MuiDrawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <Typography variant="h5">LogisticHub</Typography>
          ) : (
            <Typography variant="h5">LH</Typography>
          )}
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#fff" }} />
        <List>
          {links.map((link, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={link.to ? Link : "button"}
                to={link.to}
                onClick={link.to ? undefined : handleExpand}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                  py: 0.5,
                  mx: 2,
                  my: 0.5,
                  borderRadius: "8px",
                  backgroundColor:
                    location.pathname === link.to ? "#152A51" : "inherit",
                  transition: "background-color .3s ease", // Анімація зміни кольору
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Колір при наведенні
                  },

                  "&:after":
                    location.pathname === link.to
                      ? {
                          content: '""',
                          position: "absolute",
                          top: "50%",
                          right: "5px",
                          borderRadius: "4px",
                          transform: "translateY(-50%)",
                          width: "8px",
                          height: "32px",
                          backgroundColor: "#F7DD72", // Колір лінії
                        }
                      : {
                          content: '""',
                        },
                }}
              >
                {open ? (
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                ) : (
                  <Tooltip title={link.text} placement="right">
                    <ListItemIcon
                      sx={{
                        color: "white",
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                  </Tooltip>
                )}
                <ListItemText
                  primary={link.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    width: open ? "" : "0px",
                    overflowX: open ? "" : "hidden",
                  }}
                />
              </ListItemButton>
              {link.expand ? (
                <Collapse in={openExpand} timeout="auto" unmountOnExit>
                  <ExpandedItems items={link.expand} />
                </Collapse>
              ) : null}
            </ListItem>
          ))}
        </List>

        <Box
          sx={{ display: "block", alignSelf: "flex-end", marginTop: "auto" }}
        ></Box>
                <SwitchLang />
        <Divider sx={{ backgroundColor: "#aaa" }} />

        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleDrawerOpen}
              sx={{
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                py: 0.5,
                mx: 2,
                my: 0.5,
                borderRadius: "8px",
                backgroundColor: "#1f2041",
                transition: "background-color .3s ease", // Анімація зміни кольору
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", // Колір при наведенні
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                }}
              >
                {open ? (
                  <IconButton>
                    <MenuOpenIcon color="grey" />
                  </IconButton>
                ) : (
                  <IconButton>
                    <MenuIcon color="grey" />
                  </IconButton>
                )}
              </ListItemIcon>
              <ListItemText
                primary={t("sideMenu.collapse")}
                sx={{
                  opacity: open ? 1 : 0,
                  width: open ? "" : "0px",
                  overflowX: open ? "" : "hidden",
                  color: "grey",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </MuiDrawer>
    </>
  );
}

export default SideMenu;
