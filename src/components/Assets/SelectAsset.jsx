import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Autocomplete, Stack, Box, TextField, Typography } from "@mui/material";
import noImage from '../../assets/img/no_image.jpeg';



function SelectAsset({ type, onChange }) {



  const [assets, setAssets] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `${config.serverUrl}/axios/cards/fetchAssets.php`,
        { company_id: company_id, assets: type },
        headers
      )
      .then((response) => {
        const data = response.data;
        setAssets(data);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }, [company_id]);

  const getOptionLabel = (option) => {
    if (type === "vehicles") {
      return option.vehicleNumber; // Наприклад, ім'я транспортного засобу
    } else if (type === "drivers") {
      return `${option.firstname} ${option.lastname}`; // Ім'я та прізвище водія
    } else if (type === "trailers") {
      return option.trailerNumber; // Номер причепа
    } else {
      return "Unknown"; // Якщо тип не відповідає жодному з варіантів
    }
  };

  const SelectedItem = () => {

    if (type === "drivers") {
      return selectedElement ? (
        selectedElement.driverAvatar === "1"? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={
                config.serverUrl +
                "/images/drivers/" +
                selectedElement.driver_id +
                ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "8px", height: "64px" }}
            />
            <Typography variant="h4">
              {selectedElement?.firstname?.charAt(0)}.{" "}
              {selectedElement?.lastname}
            </Typography>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={noImage}
              alt="no_avatar"
              style={{ borderRadius: "4px", height: "64px" }}
            />
            <Typography>
              {selectedElement?.firstname?.charAt(0)}.{" "}
              {selectedElement?.lastname}
            </Typography>
          </Stack>
        )
      ) : null;
    } else if (type === "vehicles") {
      return selectedElement ? (
        selectedElement.vehicleAvatar === "1" ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={
                config.serverUrl +
                "/images/vehicles/" +
                selectedElement.driver_id +
                ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "8px", height: "64px" }}
            />
            <div>
              <Typography variant="h4">
                {selectedElement.vehicleNumber}
              </Typography>
              <Typography variant="h5">
                {selectedElement.vehicleName}
              </Typography>
            </div>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={noImage}
              alt="no_avatar"
              style={{ borderRadius: "4px", height: "64px" }}
            />
            <Typography>
              {selectedElement?.firstname?.charAt(0)}.{" "}
              {selectedElement?.lastname}
            </Typography>
          </Stack>
        )
      ) : null;
    } else if (type === "trailers") {
      return selectedElement ? (
        selectedElement.trailerAvatar === "1" ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >



            <img
              src={
                config.serverUrl +
                "/images/trailers/" +
                selectedElement.driver_id +
                ".jpeg"
              }
              alt="avatar"
              style={{ borderRadius: "8px", height: "64px" }}
            />
            <div>
              <Typography variant="h4">
                {selectedElement.trailerNumber}
              </Typography>
              <Typography variant="h5">
                {selectedElement.trailerName}
              </Typography>
            </div>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={noImage}
              alt="no_avatar"
              style={{ borderRadius: "4px", height: "64px" }}
            />
            <div>
              <Typography variant="h4">
                {selectedElement.trailerNumber}
              </Typography>
              <Typography variant="h5">
                {selectedElement.trailerName}
              </Typography>
            </div>
          </Stack>
        )
      ) : null;
    } else {
      return null; // Якщо тип не відповідає жодному з варіантів
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedElement(newValue);
    onChange(newValue);
  };

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Autocomplete
        options={assets} // Список елементів для вибору
        getOptionLabel={(option) => getOptionLabel(option)}
        onChange={handleChange}
        key={(option, index) => index}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Виберіть елемент"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />
      <SelectedItem />
    </Stack>
  );
}

export default SelectAsset;
