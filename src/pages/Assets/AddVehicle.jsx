import {
  Paper,
  InputLabel,
  TextField,
  Button,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import AvatarUploader from "../../components/Uploader/AvatarUploader";
import { useFormik } from "formik";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SelectVehicleType from "../../components/General/Inputs/SelectVehicleType";
import SelectFuilType from "../../components/General/Inputs/SelectFuilType";
import SSwitch from "../../components/General/Inputs/SSwitch";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import axios from "axios";
import config from "../../config";





function AddVehicle() {
  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      avatar: "",
      gauge: "",
      name: "",
      number: "",
      produced: 0,
      volume: "",
      fuil: "",
      axis: "",
    },
    onSubmit: (values) => {
      hendleSubmitForm(values);
    },
  });

  const hendleSubmitForm = (values) => {
    values.company = company_id;
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };
      axios
      .post(
        `${config.serverUrl}/axios/cards/saveNewVehicle.php`, 
        headers)       
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Помилка зберження даних", error);
      });  
  };

  const { t } = useTranslation();

  const handleAvatarUpload = (avatar) => {
    formik.setFieldValue("avatar", avatar);
  };

  return (
    <Grid xs={12} container spacing={3}>
      <Grid xs="auto" sx={{ width: "100%", maxWidth: "900px" }}>
        <Paper>
          <Grid container alignItems="center" sx={{ px: 3, py: 1 }}>
            <Grid xs>
              <Typography variant="h3">
                {t("assets.vehicles.addNewVehicle")}
              </Typography>
            </Grid>
            <Grid xs="auto">
              <IconButton
                aria-label="close"
                onClick={() => {
                  alert("Close");
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} sx={{ px: 3, pt: 3 }}>
              <Grid xs={12} md="auto" sx={{ textAlign: "center" }}>
                <AvatarUploader onAvatarUpload={handleAvatarUpload} />
                <InputLabel sx={{ mt: 3, mb: 1, textAlign: "left" }}>
                  {t("assets.vehicles.distanseGauge")}
                </InputLabel>
                <SSwitch
                  name="gauge"
                  value={formik.values.gauge}
                  onChange={(e) => formik.handleChange(e)}
                  sx={{ mt: 4 }}
                />

                <InputLabel sx={{ mt: 3, textAlign: "left" }}>
                  Пробіг, км
                </InputLabel>
                <TextField
                  variant="standard"
                  name="distance"
                  size="small"
                  placeholder="Ввести"
                  onChange={(e) => formik.handleChange(e)}
                />
              </Grid>

              <Grid xs={12} md>
                <SelectVehicleType />

                <InputLabel sx={{ mt: 3 }}>
                  {t("assets.vehicles.name")}
                </InputLabel>
                <TextField
                  onChange={formik.handleChange}
                  name="name"
                  value={formik.values.name}
                  placeholder={t("assets.vehicles.enterName")}
                  variant="outlined"
                />

                <InputLabel sx={{ mt: 3 }}>
                  {t("assets.vehicles.number")}
                </InputLabel>
                <TextField
                  onChange={formik.handleChange}
                  name="number"
                  value={formik.values.number}
                  placeholder={t("assets.vehicles.enterNumber")}
                  variant="outlined"
                />

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="uk"
                >
                  <InputLabel sx={{ mt: 3 }}>
                    {t("assets.vehicles.produced")}
                  </InputLabel>
                  <DatePicker
                    name="produced"
                    //value = {new Date(formik.values.produced)}
                    onChange={(newValue) =>
                      formik.setFieldValue("produced", newValue.$y)
                    }
                    views={["year"]}
                  />
                </LocalizationProvider>



                

                <InputLabel sx={{ mt: 3 }}>
                  {t("assets.vehicles.volume")}
                </InputLabel>
                <TextField
                  onChange={formik.handleChange}
                  name="volume"
                  value={formik.values.volume}
                  placeholder={t("assets.vehicles.enterValue")}
                  variant="outlined"
                />
              </Grid>

              <Grid xs={12} md>
                <SelectFuilType
                  name="fuil"
                  onChange={(e) => formik.handleChange(e)}
                />

                <InputLabel sx={{ mt: 3 }}>
                  {t("assets.vehicles.axis")}
                </InputLabel>
                <TextField
                  type="number"
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (
                      inputValue === "" ||
                      (inputValue >= 0 && inputValue <= 10)
                    ) {
                      formik.handleChange(event);
                    }
                  }}
                  name="axis"
                  value={formik.values.axis}
                  placeholder={t("assets.vehicles.enterValue")}
                  variant="outlined"
                />
              </Grid>

              <Grid xs={12} sx={{ textAlign: "right", px: 2, py: 3 }}>
                <Button>Додати в чернетку</Button>

                <Button type="submit" color="secondary" variant="contained">
                  {t("general.saveChanges")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddVehicle;
