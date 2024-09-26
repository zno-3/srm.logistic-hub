import  { useState } from "react";

import { Typography, Stack, Grid } from "@mui/material";
import GeoInput from "../../components/CustomUI/CustomInputs/GeoInput";
import ShowRouteMap from "../../components/Maps/ShowRouteMap";
import CreateRouteMap from "../../components/Maps/CreateRouteMap/CreateRouteMap";

function AddShippingSt1({ formik }) {


  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);




  const changeOrigin = (data) => {
    setIsMapInitialized(true);
    setOrigin(data.coordinates);
    formik.setFieldValue("origin", data.name);
  };


  const changeDestination = (data) => {
    setIsMapInitialized(true);
    setDestination(data.coordinates);
    formik.setFieldValue("destination", data.name);
  };
  console.log(formik.values);

  return (
    <Grid container>
      <Stack spacing={2} sx={{ width: "400px" }}>
        <Typography variant="h4">Маршрут</Typography>
        <GeoInput
          label="Пункт відправленя"
          name="origin"
          placeholder="Почніть вводити текст"
          onChange={changeOrigin}
        />
        <GeoInput
          sx={{ mt: 2 }}
          label="Пункт приначення"
          name="distenation"
          placeholder="Почніть вводити текст"
          onChange={changeDestination}
        />
      </Stack>

      
      <CreateRouteMap/>

    </Grid>
  );
}

export default AddShippingSt1;
