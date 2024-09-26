import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import axios from "axios";
import config from "../../config";
import VehicleCard from "../../components/Assets/VehicleCard";
import AddNewCard from "../../components/Cards/AddNewCard";
import { Link } from "react-router-dom";
import { Box, Pagination, Stack } from "@mui/material";
import { useUI } from "../../context/CustomIUProvider";

import Header from "../../components/Layouts/Header/Header";
import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import StatusFilter from "../../components/Assets/StatusFilter";
import SkeletonCard from "../../components/Assets/SkeletonCard";

function Vehicles() {
  const { t } = useTranslation();
  const { showSnackbar } = useUI();
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [currentVehicles, setCurrentVehicles] = useState([]);

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();

  const [vehicles, setVehicles] = useState([]);
  const [statuses, setStatuses] = useState([0, 0, 0]);

  const links = ["drivers", "vehicles", "trailers"];

  useEffect(() => {
    setCurrentVehicles(
      vehicles.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [page, vehicles]);

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
        { company_id: company_id, assets: "vehicles" },
        headers
      )
      .then((response) => {
        const data = response.data;
        setVehicles(data);
        setCurrentVehicles(
          data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        );
        setStatuses([
          data.filter((item) => item.vehicleStatus === "1").length,
          data.filter((item) => item.vehicleStatus === "2").length,
          data.filter((item) => item.vehicleStatus === "3").length,
        ]);
        // Мінімум 0.5 сек перед показом контенту
        setTimeout(() => {
          setLoading(false); // Ставимо стан, що дані завантажені
        }, 650); // Затримка у 0.5 секунди
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          if (error.response.status === 401) {
            showSnackbar(t(error.response.data.message), "error");
          } else if (error.response.status === 500) {
            showSnackbar(t("errors.server"), "error");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setLoading(false);
      });
  }, [company_id]);

  const handleDeleteVehicle = (vehicleId) => {
    // Видаляємо автомобіль з масиву vehicles
    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle.vehicle_id !== vehicleId
    );

    // Оновлюємо стани
    setVehicles(updatedVehicles);

    // Перевіряємо, чи не залишилася сторінка порожньою після видалення
    const newTotalPages = Math.ceil(updatedVehicles.length / itemsPerPage);
    if (page > newTotalPages) {
      setPage(newTotalPages);
    } else {
      setCurrentVehicles(
        updatedVehicles.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      );
    }

    // Оновлюємо статуси
    setStatuses([
      updatedVehicles.filter((item) => item.vehicleStatus === "1").length,
      updatedVehicles.filter((item) => item.vehicleStatus === "2").length,
      updatedVehicles.filter((item) => item.vehicleStatus === "3").length,
    ]);
  };

  //const getFilteredData = () => {
  //  if (activeFilters.includes(0)) {
  //    return vehicles;
  //  }
  //  return vehicles.filter((item) =>
  //    activeFilters.includes(Number(item.vehicleStatus))
  //  );
  //};

  return (
    <>
      <SideMenu />
      <Grid
        container
        sx={{
          width: "100%",
          position: "relative",
          m:2,
          p: 2,
          borderRadius: "14px",
          background: "#FCFCFC",
          overflow: "auto",
        }}
      >
        <Grid container xs={12} direction="column" sx={{ my: 2 }}>
          <Header
            title={t("pages.assets")}
            activeLink={1}
            links={links}
            prefix="/assets"
          />

          <Box sx={{ p: 0.5, mt: 2, backgroundColor: "#f2f2f2" }}>
            <StatusFilter type="vehicles" statuses={statuses} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Grid container>
              {loading
                ? Array(5)
                    .fill()
                    .map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))
                : currentVehicles.map((vehicle) => (
                    <VehicleCard
                      data={vehicle}
                      key={vehicle.vehicle_id}
                      onDelete={() => handleDeleteVehicle(vehicle.vehicle_id)}
                    />
                  ))}

              <Link to="/assets/new-vehicle">
                <AddNewCard item="vehicle" />
              </Link>
            </Grid>
          </Box>
          <Stack spacing={2} alignItems="center" mt={2}>
            <Pagination
              count={Math.ceil(vehicles.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
export default Vehicles;
