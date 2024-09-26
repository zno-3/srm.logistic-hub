import {
  Stepper,
  StepButton,
  Box,
  Step,
  Paper,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Typography,
} from "@mui/material";
import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { useEffect, useState } from "react";
import Header from "../../components/Layouts/Header/Header";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import AddShippingSt1 from "./AddShippingSt1";
import AddShippingSt2 from "./AddShippingSt2";
import AddShippingSt3 from "./AddShippingSt3";
import AddShippingSt4 from "./AddShippingSt4";

function AddShipping() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Маршрут", "Вантаж", "Автопарк", "Документи"];
  const [completed, setCompleted] = useState({});
  const [shippingData, setShippingData] = useState({});

  const setData = (newData, key) => {
    setShippingData((prevData) => ({
      ...prevData,
      [key]: {
        // Використовуємо динамічний ключ
        ...prevData[key], // Зберігаємо попередні дані за цим ключем
        ...newData, // Оновлюємо новими даними
      },
    }));
  };

  useEffect(() => {
    console.log(shippingData);
  }, [shippingData]);

  const handleStep = (index) => {
    setActiveStep(index);
    setCompleted((prevCompleted) => {
      const newCompleted = {};
      for (let i = 0; i <= index; i++) {
        newCompleted[i] = true;
      }
      return newCompleted;
    });
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 25,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#0E1C36",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#0E1C36",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "transparante",
    zIndex: 1,
    color: "red",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid tranparante",

    ...(ownerState.active && {
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      border: "1px solid #0E1C36",
      color: "#0E1C36",
    }),
    ...(ownerState.completed && {
      color: "#0E1C36",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
      4: <GroupAddIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const formik = useFormik({
    initialValues: {
      origin: "",
      pod: [],
      estTime: "",
      estDistanse: 0,
      driverId: "",
    },
    onSubmit: (values) => {
      console.log("values:" + values);
      //handleSubmitForm(values);
    },
  });

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
            title={t("pages.addShipping")}
            //activeLink={links.indexOf(type)}
            //links={links}
            prefix="/assets"
          />
          <Box
            sx={{
              p: 0.5,
              mt: 2,
              borderRadius: "4px",
              backgroundColor: "#f2f2f7",
            }}
          >
            <Stepper
              sx={{ width: "600px", m: "0 auto" }}
              nonLinear
              //alternativeLabel
              activeStep={activeStep}
              //connector={<ColorlibConnector />}
            >
              {steps.map((label, index) => (
                <Step key={index} completed={completed[index]}>
                  <StepButton color="inherit" onClick={() => handleStep(index)}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box
            sx={{
              p: 1,
              mt: 2,
              borderRadius: "4px",
              backgroundColor: "#f2f2f7",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={12} md={8}>
                <Paper sx={{ p: 2, height: "100%" }} elevation={0}>
                  {activeStep === 0 && (
                    <AddShippingSt1 setData={setData} formik={formik} />
                  )}
                  {activeStep === 1 && (
                    <AddShippingSt2 setData={setData} formik={formik} />
                  )}
                  {activeStep === 2 && (
                    <AddShippingSt3 setData={setData} formik={formik} />
                  )}
                  {activeStep === 3 && (
                    <AddShippingSt4 setData={setData} formik={formik} />
                  )}
                </Paper>
              </Grid>
              <Grid
                xs={12}
                md={4}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Paper elevation={0} sx={{ p: 1 }}>
                  <Typography variant="h4">Маршрут</Typography>
                  <Typography variant="body2">
                    Пункт відправлення: {formik.values.origin}
                  </Typography>
                  <Typography variant="body2">
                    Пункт відправлення: {formik.values.origin}
                  </Typography>

                  <Typography sx={{ mt: 2 }} variant="h4">
                    Вантаж
                  </Typography>
                  <Typography sx={{ mt: 2 }} variant="h4">
                    Автопарк
                  </Typography>
                  <Typography variant="body2">Водій:</Typography>

                  <Typography variant="h6">
                    {shippingData.driver.firstname +
                      " " +
                      shippingData.driver.lastname}
                  </Typography>

                  <Typography variant="body2">Транспортний засіб:</Typography>
                  <Typography variant="h5">
                    {shippingData.vehicle.vehicleNumber}
                  </Typography>

                  <Typography variant="h6">
                    {shippingData.vehicle.vehicleName}
                  </Typography>

                  <Typography variant="body2">Причеп: </Typography>
                  <Typography variant="h5">
                    {shippingData.trailer.trailerNumber}
                  </Typography>
                  <Typography variant="h6">
                    {shippingData.trailer.trailerName}
                  </Typography>

                  <Typography variant="h4" sx={{ mt: 2 }}>Документи</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AddShipping;
