import { useState } from "react";
import {
  Box,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { ReactComponent as VehicleIcon } from "../../assets/icons/vehicle.svg";
import config from "../../config";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ReactComponent as RestIcon } from "../../assets/icons/rest.svg";
import { ReactComponent as BlankIcon } from "../../assets/icons/blank.svg";

const MoreMenu = (props) => {
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
      <IconButton aria-label="more" onClick={handleClickMore}>
        <MoreHorizIcon />
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

const getFullName = (lastname, firstname) => {
  if (!lastname && !firstname) {return null;}
  if (!lastname) {return firstname;}
  if (!firstname) {return lastname;}
  return `${lastname} ${firstname.charAt(0)}.`;
};

function VehicleCard(props) {
  const { t } = useTranslation();

  const driverName = getFullName(props.data.lastname, props.data.firstname);

  let statusColor = null;
  let statusText = null;
  let statusIcon = null;

  switch (props.data.driverStatus) {
    case "1":
      statusIcon = (
        <VehicleIcon
          style={{ height: "18px", width: "18px", fill: "#0E951B" }}
        />
      );
      statusColor = "#0E951B";
      statusText = t("general.status.flight");
      break;
    case "2":
      statusColor = "#0075C4";
      statusIcon = (
        <BlankIcon
          style={{ height: "18px", width: "18px", fill: statusColor }}
        />
      );
      statusText = t("general.status.free");
      break;
    case "3":
      statusColor = "#A61C3C";
      statusIcon = (
        <RestIcon
          style={{ height: "18px", width: "18px", fill: statusColor }}
        />
      );
      statusText = t("general.status.rest");
      break;

    default:
      break;
  }

  return (
    <Paper
      elevation={4}
      sx={{
        width: "264px",
        height: "130px",
        m: 1,
        p: 1.5,
        lineHeight: 1,
        color: "#0E1C36",
      }}
    >
      <Grid container>
        <Grid sx={{ width: "64px" }}>
          {props.data.vehicleAvatar ? (
            <img
              src={
                config.serverUrl +
                "/images/vehicles/" +
                props.data.vehicle_id +
                ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "50%", height: "64px" }}
            />
          ) : (
            <img
              src={config.rootUrl + "/src/assets/img/no_vehicle_img.png"}
              alt="no_avatar"
              style={{ borderRadius: "4px", width: "100%" }}
            />
          )}
        </Grid>

        <Grid xs sx={{ ml: 1.5 }}>
          <Typography sx={{ fontWeight: 600 }}>
            {props.data.vehicleNumber}
          </Typography>
          <Typography variant="caption">{props.data.vehicleName}</Typography>
          <Box>
            <span style={{ verticalAlign: "middle", height: "5px" }}>
              {statusIcon}
            </span>
            <Typography
              variant="body2"
              component="span"
              sx={{ ml: 1, color: statusColor }}
            >
              {statusText}
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <MoreMenu />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 0.5 }}>
        <Grid>
          <Typography
            variant="caption"
            component="div"
            sx={{ p: 0, lineHeight: 1.1, userSelect: "none" }}
          >
            {t("assets.drivers.driver")}:
          </Typography>

          <Typography
            component="div"
            sx={{ p: 0, m: 0, fontWeight: 600, fontSize: "14px" }}
          >
            {driverName}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default VehicleCard;
