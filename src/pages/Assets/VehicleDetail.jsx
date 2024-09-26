import { Avatar, Paper, Typography } from "@mui/material";
import Header from "../../components/Layouts/Header/Header";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useParams } from "react-router-dom";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

import { ReactComponent as PetrolIcon } from "../../assets/icons/petrol-pump.svg";
import InfoIconBlock from "../../components/Layouts/InfoIconBlock";

import config from "../../config";

const demo = {
  number: "AA 25-74 AX",
  name: "Scania R420",
};

function VehicleDetail() {
  const { id } = useParams();

  const info = [
    { option: "Заправлено палива", data: "5234 л" },
    { option: "Нормативна витрата", data: "50 л / 100 км" },
    { option: "Середня витрата", data: "48 л / 100 км" },
  ];

  const links = ["vehicles", "drivers", "trailers"];

  return (
    <Grid  xs={12}>
      <Paper sx={{ background: "#F2F2F7", p: 1 }} elevation={3}>
        <Grid sx={{p:1}} xs={12}>
          <Header  title="Вантажівка" links={links}></Header>
        </Grid>
        <Grid xs>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={5}>
              <Grid>
                <Avatar
                  sx={{ width: 210, height: 210 }}
                  alt="vehicle"
                  src={config.serverUrl + "/images/vehicles/1.jpeg"}
                ></Avatar>
                <Typography variant="subtitle1">Тягач</Typography>
                <Typography sx={{ my: 1 }} variant="h3">
                  {demo.number}
                </Typography>
                <Typography variant="subtitle2">{demo.name}</Typography>В рейсі
              </Grid>
              <Grid xs>
                <InfoIconBlock icon={<PetrolIcon />} items={info} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default VehicleDetail;
