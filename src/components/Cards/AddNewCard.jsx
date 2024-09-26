import { Paper, Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";

function AddNewCard(props) {
  const { t } = useTranslation();

  const iconStyles = {
    fill: "#0E1C36",
    width: "40px",
    height: "40px",
  };
  var text, icon;

  switch (props.item) {
    case "driver":
      text = t("assets.drivers.addNewDriver");
      break;
    case "vehicle":
      text = t("assets.vehicles.addNewVehicle");
      break;
    case "trailer":
      text = t("assets.trailers.addNewTrailer");
      break;

    default:
      break;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        width: "264px",
        height: "130px",
        m: 1,
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: '#fff0',
        backgroundImage:
          'url(\'data:image/svg+xml,%3csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100%25" height="100%25" fill="none" rx="8" ry="8" stroke="%230E1C36FF" stroke-width="2" stroke-dasharray="15" stroke-dashoffset="22" stroke-linecap="square"/%3e%3c/svg%3e\')',
      }}
    >
      <Grid container>

        <Grid xs={12} textAlign="center">
          <Typography variant="h4" sx={{userSelect: "none"}}>
            + {text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddNewCard;