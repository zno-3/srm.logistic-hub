import { Paper, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import config from "../../config";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

import { useTheme } from "@mui/material";
import CardStatus from "./CardStatus";

function AssetCard({ type, data }) {
  const theme = useTheme();
  const { t } = useTranslation();

  const MoreMenu = (data) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleClickMore = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleProfileClick = () => {
      handleClose();
    };

    const handleMyAccountClick = () => {
      handleClose();
    };

    const handleLogoutClick = () => {
      handleClose();
    };

    return (
      <>
        <IconButton
          aria-label="more"
          color="primary"
          size="small"
          onClick={handleClickMore}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>{t("general.delete")}</MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: "300px",
        m: 1,
        p: 1.5,
        color: "#0E1C36",
        backgroundColor: "#F2F2F7",
      }}
    >
      <Grid container>
        <Grid sx={{ width: "64px" }}>
          {data.driverAvatar ? (
            <img
              src={
                config.serverUrl + "/images/drivers/" + data.driver_id + ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "8px", height: "64px" }}
            />
          ) : (
            <img
              src={config.rootUrl + "/src/assets/img/no_driver_img.png"}
              alt="no_avatar"
              style={{ borderRadius: "4px", width: "100%" }}
            />
          )}
        </Grid>

        <Grid xs sx={{ ml: 1.5 }}>
          <Typography sx={{ mt: 1 }} variant="h3">
            {data.lastname}
          </Typography>
          <Typography variant="h5" color="grey[500]">
            {data.firstname}
          </Typography>
        </Grid>

        <Grid>
          <MoreMenu />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ mt: 0.5, p: 1.5 }}>
        <CardStatus status={data.driverStatus} />

        <Typography
          variant="caption"
          component="div"
          sx={{ mt: 1, userSelect: "none" }}
        >
          {t("general.vehicle")}:
        </Typography>
        <Typography variant="subtitle2">
          {data.vehicleNumber + " / " + data.vehicleName}
        </Typography>

        <Typography variant="caption" sx={{ mt: 1, userSelect: "none" }}>
          {t("assets.trailers.trailer")}:
        </Typography>
        <Typography variant="subtitle2">
          {data.trailerNumber + " / " + data.trailerName}
        </Typography>
      </Paper>
    </Paper>
  );
}

export default AssetCard;
