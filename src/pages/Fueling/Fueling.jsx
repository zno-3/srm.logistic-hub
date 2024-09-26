import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import Header from "../../components/Layouts/Header/Header";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Menu,
  Stack,
  ListItemIcon,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import config from "../../config";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { DateInput } from "../../components/CustomUI/CustomInputs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";

function Fueling() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        `${config.serverUrl}/axios/fueling/fetchFueling.php`,
        { company_id: company_id },
        headers
      )
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "fuel_id", headerName: "#", width: 100 },
    //{ field: "company_id", headerName: "Company ID", width: 150 },
    { field: "vehicleName", headerName: "Транспотний засіб", width: 150 },
    { field: "vehicleNumber", headerName: "Номер", width: 150 },
    { field: "value", headerName: "Обєм, л", width: 150 },
    { field: "date", headerName: "Дата", width: 150 },
  ];


  const handleAddRow = () => {

  };

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
          background: "#FCFCFC",
          overflow: "auto",
        }}
      >
        <Grid container xs={12} direction="column" sx={{ my: 2 }}>
          <Header title="Пальне" />

          <Box sx={{ p: 1, mt: 2, backgroundColor: "#f2f2f2" }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Період з</Typography>
              <DateInput
                name="from"
                sx={{
                  width: "160px",
                  border: "1px solid #d2d2d2",
                  borderRadius: "6px",
                }}
              />
              <Typography>по</Typography>
              <DateInput
                name="to"
                sx={{
                  width: "160px",
                  border: "1px solid #d2d2d2",
                  borderRadius: "6px",
                }}
              />

              <Tooltip title="add">
                <Button
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddRow}
                >
                  Add record
                </Button>
              </Tooltip>

              <Tooltip title="Export">
                <IconButton onClick={handleClick} aria-label="Export">
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FileDownloadIcon fontSize="small" />
                </ListItemIcon>
                Excel
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FileDownloadIcon fontSize="small" />
                </ListItemIcon>
                PDF
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FileDownloadIcon fontSize="small" />
                </ListItemIcon>
                json
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ mt: 2, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              loading={loading}
              getRowId={(row) => row.fuel_id} // Вказуємо, як визначати унікальний ID для рядків



            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default Fueling;
