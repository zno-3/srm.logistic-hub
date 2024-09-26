import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography} from "@mui/material";
import { useTranslation } from "react-i18next";

function Label(props) {
const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-between">
      <Grid sx={{ color: "#0E1C36" }}>
        {props.label && <Typography variant="body2">{props.label}</Typography>}
      </Grid>
      <Grid>
        {props.notNecessarily && (
          <Typography variant="caption">
            {t("general.notNecessarily")}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Label;
