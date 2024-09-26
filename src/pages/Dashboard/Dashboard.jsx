import Header from "../../components/Layouts/Header/Header";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import config from "../../config";
import { useUI } from "../../context/CustomIUProvider";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import Assets from "./Assets";

import { Button, Link } from "@mui/material";

function Dashboard() {
  const { t } = useTranslation();

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();
  const [assets, setAssets] = useState({
    drivers: { status1: "", status2: "", status3: "" },
    vehicles: { status1: "", status2: "", status3: "" },
    trailers: { status1: "", status2: "", status3: "" },
  });

  const { showSnackbar } = useUI();

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        `${config.serverUrl}/axios/dashboard/fetchAssets.php`,
        { company_id: company_id },
        headers
      )
      .then((response) => {
        const data = response.data;
        setAssets({
          drivers: {
            status1: data.drivers.status_1 * 1,
            status2: data.drivers.status_2 * 1,
            status3: data.drivers.status_3 * 1,
          },
          vehicles: {
            status1: data.vehicles.status_1 * 1,
            status2: data.vehicles.status_2 * 1,
            status3: data.vehicles.status_3 * 1,
          },
          trailers: {
            status1: data.trailers.status_1 * 1,
            status2: data.trailers.status_2 * 1,
            status3: data.trailers.status_3 * 1,
          },
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error(error);
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
      });
  }, []);

  return (
    <>
      <SideMenu />
      <Grid
        container
        sx={{
          width: "100%",
          position: "relative",
          m: 2,
          p: 2,
          borderRadius: "14px",
          background: "#F5F5F5",
          direction: "column",
        }}
      >
        <Grid container xs={12} direction="column" sx={{ my: 2 }}>
          <Header title={t("pages.dashboard")} />
          <Button component={Link} variant="contained" color="primary" href="/invite-employees">Додати співробітника</Button>

          <Grid>
            <Assets data={assets} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
