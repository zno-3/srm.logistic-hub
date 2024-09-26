import { Stack, Typography } from "@mui/material";

import { ReactComponent as RestIcon } from "../../assets/icons/rest.svg";
import { ReactComponent as BlankIcon } from "../../assets/icons/blank.svg";
import { ReactComponent as VehicleIcon } from "../../assets/icons/vehicle.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

function CardStatus({ status }) {
  const theme = useTheme();
  const { t } = useTranslation();

  const color = {
    1: theme.palette.info.main,
    2: theme.palette.success.main,
    3: theme.palette.error.main,
  };


  let statusText = null;
  let statusIcon = null;


  switch (status) {
    case "1":
      statusText = t("general.status.flight");
      statusIcon = (
        <VehicleIcon
          style={{ height: "18px", width: "18px", fill: color[status] }}
        />
      );
      break;

    case "2":

      statusText = t("general.status.free");
      statusIcon = (
        <BlankIcon
          style={{ height: "18px", width: "18px", fill: color[status] }}
        />
      );

      break;
    case "3":
      statusText = t("general.status.rest");
      statusIcon = (
        <RestIcon
          style={{ height: "18px", width: "18px", fill: color[status] }}
        />
      );

      break;

    default:
      break;
  }
  return (
    <Stack direction="row">
      {statusIcon}

      <Typography
        variant="body2"
        component="span"
        sx={{ ml: 1, color: color[status] }}
      >
        {statusText}
      </Typography>
    </Stack>
  );
}

export default CardStatus;
