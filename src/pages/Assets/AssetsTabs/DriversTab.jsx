import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import axios from "axios";
import config from "../../../config";
import DriverCard from "../../../components/Cards/DriverCard";
import AddNewCard from "../../../components/Cards/AddNewCard";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useUI } from "../../../context/CustomIUProvider";
import FilterChip from "../../../components/General/FilterChip";
import { ReactComponent as PeopleIcon } from "../../../assets/icons/people.svg";
import { ReactComponent as BlankIcon } from "../../../assets/icons/blank.svg";
import { ReactComponent as RestIcon } from "../../../assets/icons/rest.svg";

function DriversTab() {
  const { t } = useTranslation();
  const { showSnackbar } = useUI();

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();

  const [drivers, setDrivers] = useState([]);
  const [statuses, setStatuses] = useState([0, 0, 0]);
  const [activeFilters, setActiveFilters] = useState([0]); // 0 represents all

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
        { company_id: company_id, assets: "drivers" },
        headers
      )
      .then((response) => {
        const data = response.data;
        setDrivers(data);
        setStatuses([
          data.filter((item) => item.driverStatus === "1").length,
          data.filter((item) => item.driverStatus === "2").length,
          data.filter((item) => item.driverStatus === "3").length,
        ]);
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
      });
  }, [company_id, showSnackbar, t, authToken]);

  const handleFilterClick = (filter) => {
    if (filter === 0) {
      setActiveFilters([0]);
    } else {
      setActiveFilters((prev) => {
        const isActive = prev.includes(filter);
        if (isActive) {
          return prev.filter((f) => f !== filter);
        } else {
          return [...prev.filter((f) => f !== 0), filter];
        }
      });
    }
  };

  const getFilteredData = () => {
    if (activeFilters.includes(0)) {
      return drivers;
    }
    console.log(drivers);
    return drivers.filter((item) =>
      activeFilters.includes(Number(item.driverStatus))
    );
  };

  const chips = [
    {
      label: "total",
      icon: <PeopleIcon />,
      filter: 0,
      color: "#0E1C36",
      count: drivers.length,
    },
    {
      label: "flight",
      icon: <BlankIcon />,
      filter: 1,
      color: "#321495",
      count: statuses[0],
    },
    {
      label: "free",
      icon: <BlankIcon />,
      filter: 2,
      color: "#319752",
      count: statuses[1],
    },
    {
      label: "rest",
      icon: <RestIcon />,
      filter: 3,
      color: "#eccd12",
      count: statuses[2],
    },
  ];

  return (
    <>
      <Box>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {chips.map((chip) => {
            const active = activeFilters.includes(chip.filter);
            return (
              <Grid key={chip.filter}>
                <FilterChip
                  onClick={() => handleFilterClick(chip.filter)}
                  count={chip.count}
                  icon={chip.icon}
                  active={active}
                  label={t("general.status." + chip.label)}
                  color={chip.color}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid container>
          {getFilteredData().map((driver) => (
            <DriverCard data={driver} key={driver.driver_id} />
          ))}
          <Link to="/assets/new-driver">
            <AddNewCard item="driver" />
          </Link>
        </Grid>
      </Box>
    </>
  );
}
export default DriversTab;
