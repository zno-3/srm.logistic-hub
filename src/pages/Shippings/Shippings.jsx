import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  Tooltip,
  Button,
  MenuItem,
  Stack,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Header from "../../components/Layouts/Header/Header";
import { useTranslation } from "react-i18next";
import StatusFilter from "../../components/Assets/StatusFilter";
import config from "../../config";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DetailShipping from "./DetailShipping";
import ShippingActionMenu from "../../components/Shippings/ShippingActionMenu";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function Shippings() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [shippings, setShippings] = useState([]);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDetail = (params) => {
    setDetail(params);
    setDrawerOpen(true);
  };

  const handleDelete = (params) => {
    console.log(`Видалити: ${params.id}`);
    // Логіка для видалення
  };

  const ActionMenu = ({ params }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenuDetail = () => {
      handleClose();
      setDetail("red");
      setDrawerOpen(true);
    };

    const handleDelete = () => {
      handleClose();
      console.log(`Видалити: ${params.id}`);
      // Викликати логіку для видалення
    };

    return (
      <div>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuDetail(params)}>Детально</MenuItem>
          <MenuItem>Редагувати</MenuItem>
          <MenuItem onClick={handleDelete}>Видалити</MenuItem>
        </Menu>
      </div>
    );
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 50,
      renderCell: (params) => (
        <ShippingActionMenu
          params={params}
          onDetail={handleDetail}
          onDelete={handleDelete}
        />
      ),
    },
    { field: "shipping_id", headerName: "#" },
    { field: "origin", headerName: "Пункт відправлення" },
    { field: "destination", headerName: "Пункт Призначення" },
    {
      field: "cargo",
      headerName: "Вантаж",
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: 1,
            display: "flex",
            alignItems: "center", // Вирівнює текст вертикально по центру
            height: "100%", // Займає всю висоту комірки
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: "vehicleName", headerName: "Транспотний засіб", width: 150 },
    { field: "vehicleNumber", headerName: "Номер", width: 150 },
  ];

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `${config.serverUrl}/axios/shippings/fetchShippings.php`,
        { company_id: company_id },
        headers
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        setShippings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        throw error; // Упрощено для обробки помилок на рівні компонента
      });
  }, []);

  const handleAddShipping = () => {
    navigate("/new-shipping");
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
          <Header
            title={t("pages.shippings")}
            //activeLink={links.indexOf(type)}
            //links={links}
            //prefix="/assets"
          />

          <Box sx={{ p: 0.5, mt: 2, backgroundColor: "#f2f2f2" }}>
          <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-between"
  }}
>
            <Tooltip title="add">
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddShipping}
              >
                Створити
              </Button>
            </Tooltip>
            <StatusFilter type="drivers" statuses={[1, 0, 0]} /></Stack>
          </Box>

          <DataGrid
            sx={{ mt: 2 }}
            rows={shippings}
            columns={columns}
            pageSize={5}
            loading={loading}
            getRowId={(row) => row.shipping_id} // Вказуємо, як визначати унікальний ID для рядків
          />

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: { background: "white", width: "40%" },
            }}
          >
            <Box
              p={2}
              role="presentation"
              sx={{ color: "grey", height: "100%" }}
            >
              <DetailShipping data={detail} />
            </Box>
          </Drawer>
        </Grid>
      </Grid>
    </>
  );
}

export default Shippings;
