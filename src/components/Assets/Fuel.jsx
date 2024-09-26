import {
  Typography,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import config from "../../config";

import NumberInput from "../CustomUI/CustomInputs/NumberInput";
import DateInput from "../CustomUI/CustomInputs/DateInput";

import { useTheme } from "@mui/material";
import { useUI } from "../../context/CustomIUProvider";
import axios from "axios";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
//import InputAdornment from '@mui/material/InputAdornment';

function Fuel(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { showDialog, closeDialog, showSnackbar } = useUI();
  const authToken = useAuthHeader();

  const auth = useAuthUser();
  const company_id = auth.company_id;

  const formik = useFormik({
    initialValues: {
      vehicle_id: props.vehicle_id,
      company_id: company_id,
      value: "",
      date: "",
    },
    onSubmit: (values) => {
      hendleSubmitForm(values);
    },
  });

  const hendleSubmitForm = async (values) => {
    closeDialog();
    console.log(values);
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${config.serverUrl}/axios/assets/vehicles/fuel.php`,
        values,
        headers
      );
      console.log(response);
      if (response.data.status === "success") {
        showSnackbar("Елемент успішно видалено", "success");
      }
    } catch (error) {
      console.log(error);
      showSnackbar("Помилка при видаленні", "error");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ width: "350px" }}>
        <Typography variant="h3">{props.name}</Typography>
        <Typography variant="h4" color="grey">
          {props.number}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateInput
            sx={{ mt: 2 }}
            label="Дата"
            name="date"
            onChange={(newValue) => formik.setFieldValue("date", newValue)}
          />
        </LocalizationProvider>
        <NumberInput
          sx={{ mt: 2 }}
          name="value"
          label="Об'єм"
          min={0}
          max={1000}
          decimalPlaces={0}
          value={formik.values.value}
          onChange={formik.handleChange}
          formik={formik}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">літрів</InputAdornment>
            ),
          }}
        />

        <Button type="submit" size="small" variant="contained">
          Записати
        </Button>
        <Button size="small" variant="outlined">
          Отмена
        </Button>
      </Box>
    </form>
  );
}

export default Fuel;
