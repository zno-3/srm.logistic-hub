import { useState, useEffect } from "react";
//import "../../utils/i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import config from "../../../config";
import VehicleCard from "../../../components/Cards/VehicleCard";
import AddNewCard from "../../../components/Cards/AddNewCard";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useUI } from "../../../context/CustomIUProvider";
import FilterChip from "../../../components/General/FilterChip";
import { ReactComponent as VehicleIcon } from "../../../assets/icons/vehicle.svg";
import { ReactComponent as BlankIcon } from "../../../assets/icons/blank.svg";

function VehiclesTab() {
  const { t } = useTranslation();
  const { showSnackbar } = useUI();

  const [vehicles, setVehicles] = useState([]);
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
        config.serverUrl + "/axios/cards/fetchAssets.php",
        { company_id: company_id, assets: "vehicles" },
        headers
      )
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          // Сервер повернув відповідь з кодом статусу, що виходить за межі 2xx
          if (error.response.status === 401) {
            showSnackbar(t(error.response.data.message), "error");
          } else if (error.response.status === 500) {
            showSnackbar(t("errors.server"), "error");
          }
        } else if (error.request) {
          // Запит був зроблений, але відповіді не було
          console.error("No response received:", error.request);
        } else {
          // Щось сталося в налаштуваннях запиту
          console.error("Error setting up request:", error.message);
        }
      });
    //  return () => {
    //  cleanup
    //  };
  }, [company_id, showSnackbar, t, authToken]);

  return (
    <>
      <Box>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid>
            <FilterChip
              count={vehicles.length}
              icon={<VehicleIcon />}
              label={t("general.status.total")}
              color="#0E1C36"
            />
          </Grid>
          <Grid>
            <FilterChip
              color="#444648"
              count={2}
              icon={<BlankIcon />}
              label={t("general.status.flight")}
            />
          </Grid>
        </Grid>
        <Grid container>
          {vehicles.map((vehicle) => (
            <VehicleCard data={vehicle} key={vehicle.vehicle_id} />
          ))}
          <Link to="/assets/new-vehicle">
            <AddNewCard item="vehicle" />
          </Link>
        </Grid>
      </Box>
    </>
  );
}
export default VehiclesTab;
