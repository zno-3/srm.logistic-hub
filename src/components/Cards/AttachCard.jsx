import { Autocomplete, TextField, Paper, Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import config from "../../config";
import DriverCard from "../Assets/DriverCard";

function AttachCard({ itemName, onChange }) {
  const { t } = useTranslation();
  const auth = useAuthUser();
  const company = auth.company_id;

  const [openAutocomlete, setOpenAutocomplete] = useState(false);
  const [items, setItems] = useState([]);

  var text;

  switch (itemName) {
    case "driver":
      text = t("assets.drivers.addNewDriver");
      break;
    case "vehicle":
      text = t("assets.vehicles.addNewVehicle");
      break;
    case "trailer":
      text = t("assets.drivers.addNewTrailer");
      break;
    default:
      break;
  }

  const hendleAddClick = () => {
    setOpenAutocomplete(true);
    axios
      .post(config.rootUrl + "/backend/axios/cards/fetchAssetsShort.php", {
        assets: itemName,
        company: company,
      })
      .then((response) => {
        setItems(response.data);
        console.log("Файли були успішно завантажені", response.data);
      })
      .catch((error) => {
        console.error("Помилка завантаження файлів", error);
      });
  };

  const handleChange = (e, val) => {
    onChange(val.id);
  };

  return (<>
      <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "264px",
        height: "130px",
        m: 1,
        borderRadius: "8px",
        backgroundColor: "#fff0",
        backgroundImage:
          'url(\'data:image/svg+xml,%3csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100%25" height="100%25" fill="none" rx="8" ry="8" stroke="%230E1C36FF" stroke-width="2" stroke-dasharray="15" stroke-dashoffset="22" stroke-linecap="square"/%3e%3c/svg%3e\')',
      }}
    >
      {openAutocomlete ? (
        <Autocomplete
          fullWidth
          sx={{ m: 0.5 }}
          getOptionLabel={(option) => option.label} // Відображається у випадаючому списку
          open={openAutocomlete}
          onClose={() => setOpenAutocomplete(false)}
          onChange={handleChange}
          options={items}
          renderOption={(props, option) => (
            <Paper
              component="li"
              sx={{
                mt: 0.5,
                color: "#fff",
                backgroundColor: "#0E1C36",
                "&.Mui-focused": { backgroundColor: "#0E1C36 !important" },
                "&.MuiAutocomplete-option[aria-selected='true']": { backgroundColor: "#152A51 " },
                "&:hover": { backgroundColor: "#152A51 !important" },                
              }}
              {...props}
            >
              {option.label}
            </Paper>
          )}
          renderInput={(params) => (
            <TextField
            sx={{border: "none"}}
              {...params}
              label="оберіть"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      ) : (
        <Grid container textAlign="center">
          <Typography
            onClick={hendleAddClick}
            variant="h4"
            sx={{ userSelect: "none", cursor: "pointer" }}
          >
            + {text}
          </Typography>
        </Grid>
      )}
    </Paper>
    
  </>

  );
}

export default AttachCard;
