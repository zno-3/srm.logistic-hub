import {
  Paper,
  IconButton,
  Typography,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import config from "../../config";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

import { ReactComponent as RestIcon } from "../../assets/icons/rest.svg";
import { ReactComponent as BlankIcon } from "../../assets/icons/blank.svg";
import { ReactComponent as VehicleIcon } from "../../assets/icons/vehicle.svg";
import { useTheme } from "@mui/material";
import { useUI } from "../../context/CustomIUProvider";
import axios from "axios";



import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function TrailerCard(props) {
  const authToken = useAuthHeader();

  const theme = useTheme();
  const { t } = useTranslation();
  const { showDialog, closeDialog, showSnackbar } = useUI();

  const Status = (props) => {
    let statusColor = null;
    let statusText = null;
    let statusIcon = null;

    switch (props.status) {
      case "1":
        statusColor = theme.palette.info.main;
        statusText = t("general.status.flight");
        statusIcon = (
          <VehicleIcon
            style={{ height: "18px", width: "18px", fill: statusColor }}
          />
        );
        break;
      case "2":
        statusColor = theme.palette.success.main;
        statusText = t("general.status.free");
        statusIcon = (
          <BlankIcon
            style={{ height: "18px", width: "18px", fill: statusColor }}
          />
        );
        break;
      case "3":
        statusColor = theme.palette.error.main;
        statusText = t("general.status.rest");
        statusIcon = (
          <RestIcon
            style={{ height: "18px", width: "18px", fill: statusColor }}
          />
        );
        break;

      default:
        break;
    }

    return (
      <>
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
      </>
    );
  };

  const MoreMenu = () => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleClickMore = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
      const hendleDeleteItem = async () => {
        closeDialog();
        const headers = {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.post(
            `${config.serverUrl}/axios/cards/deleteItem.php`,
            {
              table: "vehicles",
              column: "vehicle_id",
              value: props.data.vehicle_id,
            },
            headers
          );
          if (response.data.status === "success") {
            showSnackbar("Елемент успішно видалено", "success");
          }
        } catch (error) {
          console.log(error.response.data);
          showSnackbar("Помилка при видаленні", "error");
        }
      };
      const Footer = () => {
        return (
          <>
            <Button size="small" variant="contained" onClick={hendleDeleteItem}>
              Так
            </Button>
            <Button size="small" variant="outlined" onClick={closeDialog}>
              Відмінити
            </Button>
          </>
        );
      };

      showDialog({
        content: "Ви впервені, що хочете видлаити елемент?",
        title: null,
        footer: <Footer />,
        onClose: false,
      });
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
          <MenuItem>Детально</MenuItem>


          <MenuItem onClick={handleDelete}>
            <DeleteOutlinedIcon color="grey" size="small" sx={{ mr: 1 }} />
            {t("general.delete")}
          </MenuItem>
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
        lineHeight: 1,
        color: "#0E1C36",
        backgroundColor: "#F2F2F7",
      }}
    >
      <Grid container>
        <Grid sx={{ width: "64px" }}>
          {props.data.driverAvatar ? (
            <img
              src={
                config.serverUrl +
                "/images/trailers/" +
                props.data.trailer_id +
                ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "8px", height: "64px" }}
            />
          ) : (
            <img
              src={config.rootUrl + "/src/assets/img/no_trailer_img.png"}
              alt="no_avatar"
              style={{ borderRadius: "4px", width: "100%" }}
            />
          )}
        </Grid>

        <Grid xs sx={{ ml: 1.5 }}>
          <Typography sx={{ mt: 1 }} variant="h3">
            {props.data.trailerNumber}
          </Typography>
          <Typography variant="h5" color="grey[500]">
            {props.data.trailerName}
          </Typography>
        </Grid>

        <Grid>
          <MoreMenu />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ mt: 0.5, p: 1.5 }}>
        <Status status={props.data.vehicleStatus} />

        <Typography
          variant="caption"
          component="div"
          sx={{ mt: 1, userSelect: "none" }}
        >
          {t("assets.drivers.driver")}:
        </Typography>
        <Typography variant="subtitle2">
          {props.data.lastname + " " + props.data.firstname}
        </Typography>

        <Typography variant="caption" sx={{ mt: 1, userSelect: "none" }}>
          {t("assets.vehicles.vehicle")}:
        </Typography>
        <Typography variant="subtitle2">
          {props.data.vehicleNumber + " / " + props.data.vehicleName}
        </Typography>
      </Paper>
    </Paper>
  );
}

export default TrailerCard;
