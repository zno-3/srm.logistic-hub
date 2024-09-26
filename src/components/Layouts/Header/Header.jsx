import UserMenu from "../../Menu/UserMenu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const actionStyles = {
    color: "#0E1C36",
    fontSize: "3em",
    borderRadius: "8px",
    minWidth: "180px",
    "& .MuiBottomNavigationAction-label": {
      fontSize: "18px",
    },
    "&.Mui-selected": {
      backgroundColor: "#152A51",
      "& .MuiBottomNavigationAction-label": {
        color: "#fff",
        fontSize: "18px",
      },
    },
  };
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid xs="auto">
          <Typography variant="h1" gutterBottom>
            {props.title}
          </Typography>
        </Grid>
        <Grid xs="auto" sx={{ textAlign: "center", margin: "0 auto" }}>
          {props.links ? (
            <BottomNavigation
              showLabels
              value={props.activeLink}
              sx={{
                height: "45px",
                borderRadius: "8px",
                backgroundColor: "#F2F2F7",
                p: 0.5,
              }}
            >
              {props.links.map((link) => (
                <BottomNavigationAction
                  key={link}
                  label={t("pages." + link)}
                  sx={actionStyles}
                  onClick={() => navigate(props.prefix + "/" + link)}
                />
              ))}
            </BottomNavigation>
          ) : null}
        </Grid>

        <Grid xs="auto">
          <UserMenu />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
