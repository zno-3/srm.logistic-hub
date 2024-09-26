import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

import { ReactComponent as RestIcon } from "../../assets/icons/rest.svg";
import { ReactComponent as BlankIcon } from "../../assets/icons/blank.svg";
import { ReactComponent as VehicleIcon } from "../../assets/icons/vehicle.svg";
import { ReactComponent as PeopleIcon } from "../../assets/icons/people.svg";
import { ReactComponent as TruckSpeedIcon } from "../../assets/icons/truck-speed.svg";

function Assets({ data }) {
  const theme = useTheme();
  const assetsTitle = ["drivers", "vehicles", "trailers"];

  const iconStyles = { height: "18px", width: "18px" };

  const statusIcons = {
    drivers: [
      { Icon: RestIcon, color: theme.palette.info.main },
      { Icon: BlankIcon, color: theme.palette.success.main },
      { Icon: VehicleIcon, color: theme.palette.error.main },
    ],
    vehicles: [
      { Icon: TruckSpeedIcon, color: theme.palette.info.main },
      { Icon: BlankIcon, color: theme.palette.success.main },
      { Icon: VehicleIcon, color: theme.palette.error.main },
    ],
    trailers: [
      { Icon: RestIcon, color: theme.palette.info.main },
      { Icon: TruckSpeedIcon, color: theme.palette.success.main },
      { Icon: PeopleIcon, color: theme.palette.error.main },
    ],
  };

  const renderStatusBox = (IconComponent, count, color) => (
    <Box>
      <IconComponent style={{ ...iconStyles, fill: color }} />
      <Typography variant="body2" component="span" sx={{ ml: 1, color }}>
        {count}
      </Typography>
    </Box>
  );

  return (
    <Stack direction="row" spacing={3}>
      {assetsTitle.map((item) => {
        const { status1, status2, status3 } = data[item];
        const total = status1 + status2 + status3;
        return (
            <Paper elevation={3} sx={{ p: 2, position: 'relative' }} key={item}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h1">{total}</Typography>
                <IconButton
                sx={{position: 'absolute', right: 3, top: 3, height: '22px', width: '22px'}}
                  color="grey.dark"
                  aria-label="open asset details"
                  size="small"
                  component={Link}
                  to={`/assets/${item}`}
                >
                  <OpenInNewIcon sx={{width: "18px"}}/>
                </IconButton>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {statusIcons[item].map((icon, index) =>
                  renderStatusBox(icon.Icon, data[item][`status${index + 1}`], icon.color)
                )}
              </Stack>
            </Paper>
          );
        })}
    </Stack>
  );
}

export default Assets;
