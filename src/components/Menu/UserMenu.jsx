import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next";
import config from "../../config";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListItem,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";

import useSignIn from "react-auth-kit/hooks/useSignIn"; //demo

function UserMenu() {
  
  const { t } = useTranslation();
  const signOut = useSignOut();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  
  const handleCloseMenu = () => {
    setAnchorMenu(null);
    setOpenMenu(false);
  };

  const handleOpenMenu = (event) => {
    setAnchorMenu(event.currentTarget);
    setOpenMenu(!openMenu);
  };

  const profileNavigate = () => {
    navigate("/profile/" + auth.uid);
  };

  const userData = useAuthUser();
  const fullName = userData.firstname + " " + userData.lastname;
  const company = userData.company_name;

  return (
    <>
      {isAuthenticated() ? (
        <Grid container>
          <Grid>
            <Tooltip title={fullName} placement="top">
              <Avatar
                sx={{
                  marginLeft: "1px !important",
                  width: "40px !important",
                  height: "40px !important",
                }}
                alt={userData.name}
                src={
                  config.serverUrl + "/images/users/" + userData.uid + ".jpg"
                }
              />
            </Tooltip>
          </Grid>
          <Grid>
            <IconButton
              aria-label="user-menu"
              size="small"
              onClick={handleOpenMenu}
            >
              {openMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <Menu
              sx={{ mt: 0}}
              anchorEl={anchorMenu}
              open={Boolean(anchorMenu)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <ListItem dense={true}>
                <ListItemText primary={fullName} secondary={company} />
              </ListItem>
              <Divider />
              <MenuItem onClick={profileNavigate}>Профіль</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Налаштування</MenuItem>
              <MenuItem onClick={() => {signOut(); navigate("/login");}}>{t("auth.logout")}</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              {t("auth.login")}
            </Button>
          </Link>
          <Link to="/registration" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              {t("auth.registration")}
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}

export default UserMenu;
