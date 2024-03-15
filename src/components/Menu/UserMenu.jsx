import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next";
import config from "../../config";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useState } from "react";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate, Link } from "react-router-dom";
import { 
  Avatar,
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem } from '@mui/material';

function UserMenu() {

  const { t } = useTranslation();
  const signOut = useSignOut();
  const auth = useAuthUser()
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
    navigate("/profile/"+auth.uid);
  };

  return (
    <>
      {isAuthenticated() ? (
        <Grid container>
          <Grid>
            <Avatar
              sx={{
                marginLeft: "1px !important",
                width: "40px !important",
                height: "40px !important",
              }}
              alt="Андрій Український"
              src={config.rootUrl + "/images/users/1.jpeg"}
            />
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
              sx={{ mt: 0 }}
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
              <MenuItem onClick={profileNavigate}>Профіль</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Налаштування</MenuItem>
              <MenuItem onClick={() => signOut()}>{t("login.logout")}</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      ) : (<Box>
        <Link to="/login" style={{textDecoration: 'none'}}>
            <Button size="small" variant="outlined">{t("login.login")}</Button>
        </Link>          
        <Link to="/registration" style={{textDecoration: 'none'}}>
            <Button size="small" variant="outlined">{t("login.registration")}</Button>
        </Link>
    </Box>)}
    </>
  );
}

export default UserMenu;
