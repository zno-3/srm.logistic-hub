import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Paper,
  Alert,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Tooltip,
  SvgIcon,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { ReactComponent as VehicleIcon } from "../../assets/icons/vehicle.svg";
import { ReactComponent as TrailerIcon } from "../../assets/icons/trailer.svg";
import config from "../../config";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function VehicleCard(props) {
  console.log(props);

  const ControlBtn = () => {
    const navigate = useNavigate();
      const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
      setAnchorEl(null);
    };


    const navigateToCalendar = (event) => {
      setAnchorEl(null);

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const date = `${year}-${month}`;

      navigate(config.rootUrl+'/vehicle-calendar/'+props.data.vehicle_id+'/'+date);

    };


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };



    const items = [
      {title: t('general.info'), icon: <InfoOutlinedIcon/>, click: handleClose },
      {title: t('general.calendar'), icon: <CalendarMonthIcon/>, click: navigateToCalendar },


  ];


    return (
      <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {},
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.title} onClick={item.click}>
              {item.icon} <Typography variant="inherit">{item.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const { t } = useTranslation();

  const handlerClickInfo = (data) => {
    props.callbackShowInfo(data);
  };

  let statusColor = "";
  let statusText = "";

  switch (props.data.status) {
    case 1:
      statusColor = "success";
      statusText = t("status.vehicle.free");
      break;
    case 2:
      statusColor = "info";
      statusText = t("status.vehicle.flight");
      break;
    case 3:
      statusColor = "error";
      statusText = t("status.vehicle.no_works_short");
      break;

    default:
      statusColor = "";
      break;
  }

  return (
    <Paper elevation={4} sx={{ width: "320px", height: "136px", m: 0.5, p: 1 }}>
      <Grid sx={{ width: "100%" }} container>
        <Grid
          sx={{ width: "120px", height: "120px", position: "relative", p: 0 }}
        >
          <Alert
            icon={false}
            severity={statusColor}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              p: 0,
              fontSize: "12px",
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              "& .MuiAlert-message": { padding: "4px" },
            }}
          >
            {statusText}
          </Alert>

          {props.data.avatar ? (
            <img
              src={
                config.rootUrl +
                "/images/vehicles/" +
                props.data.vehicle_id +
                ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "4px", height: "100%" }}
            />
          ) : (
            <img
              src={config.rootUrl + "/src/assets/img/no_driver_img.png"}
              alt="np_avatar"
              style={{ borderRadius: "4px", width: "100%" }}
            />
          )}
        </Grid>
        <Grid xs sx={{ ml: 1 }}>
          <Typography variant="h6">{props.data.name}</Typography>
          <Typography>{props.data.number}</Typography>
          <Typography sx={{ color: "#0075C4", mt: 3 }}>Полупричеп</Typography>
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="space-between"
          sx={{ width: "40px" }}
        >
          <Grid sx={{ height: "40px" }}>
            {props.data.driver_default ? (
              <Tooltip
                placement="left"
                title={
                  props.data.driverFirstname + " " + props.data.driverLastname
                }
              >
                {props.data.driverAvatar ? (
                  <Avatar
                    alt={props.data.driverLastname}
                    xs={{ cursor: "pointer" }}
                    onClick={() =>
                      handlerClickInfo({
                        id: props.data.driver_default,
                        info: "driver",
                      })
                    }
                    src={
                      config.rootUrl +
                      "/images/drivers/" +
                      props.data.driver_default +
                      ".jpeg"
                    }
                  />
                ) : (
                  <IconButton
                    aria-label="icon"
                    onClick={handlerClickInfo({
                      id: props.data.driver_default,
                      info: "driver",
                    })}
                    sx={{ height: "40px", width: "40px" }}
                  >
                    <SvgIcon component={VehicleIcon} inheritViewBox />
                  </IconButton>
                )}
              </Tooltip>
            ) : null}
          </Grid>
          <Grid sx={{ height: "40px" }}>
            {props.data.trailer_default ? (
              <Tooltip
                placement="left"
                title={
                  props.data.trailerName + " (" + props.data.trailerNumber + ")"
                }
              >
                {props.data.trailerAvatar ? (
                  <Avatar
                    alt={props.trailerName}
                    onClick={() =>
                      handlerClickInfo({
                        id: props.data.trailer_default,
                        info: "trailer",
                      })
                    }
                    src={
                      config.rootUrl +
                      "/images/trailers/" +
                      props.data.trailer_default +
                      ".jpeg"
                    }
                  />
                ) : (
                  <IconButton
                    aria-label="icon"
                    onClick={() =>
                      handlerClickInfo({
                        id: props.data.trailer_default,
                        info: "trailer",
                      })
                    }
                    sx={{ height: "40px", width: "40px" }}
                  >
                    <SvgIcon component={TrailerIcon} inheritViewBox />
                  </IconButton>
                )}
              </Tooltip>
            ) : null}
          </Grid>
          <Grid sx={{ position: "relative", height: "40px" }}>
            <ControlBtn itemId={props.data.driver_id} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default VehicleCard;
