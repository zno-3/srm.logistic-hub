import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MapRoute from "../Maps/MapRoute/MapRoute";

const Shipping = () => {
  const [data, setData] = useState([
    {
      contractNumber: "243-01",
      departure: "Чернігів",
      arrival: "Київ",
      distance: 140,
      duration: 1,
      product: "Хімічна продукція",
      weight: 15,
      vehicles: 2,
      loading: 'ТОВ "Кіт і собака б\'ються за шматок сала"',
      dates: "07.07.2023-09.07.2023",
      vehicleNumber: "2443-01",
    },    {
      contractNumber: "243-01",
      departure: "Чернігів",
      arrival: "Київ",
      distance: 140,
      duration: 1,
      product: "Хімічна продукція",
      weight: 15,
      vehicles: 2,
      loading: 'ТОВ "Кіт і собака б\'ються за шматок сала"',
      dates: "07.07.2023-09.07.2023",
      vehicleNumber: "AH 25-43 DF",
    },

  ]);

  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  const handleShowDetail = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null); // Згорнути, якщо вже розгорнуто
    } else {
      setOpenAccordionIndex(index); // Розгорнути новий AccordionDetails
    }
  };

  return (
    <Container maxWidth="100%">
      {data.map((row, index) => (
        <Box key={index}>
          <Paper sx={{ p: 2 , mt: 2}}>
            <Grid container spacing={2}>
              <Grid>
                <Typography variant="h5">{row.contractNumber}</Typography>
              </Grid>
              <Grid>{row.contractNumber}{index}</Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
              <Grid><Typography variant="h5" color="initial">Вантажівка: {row.vehicleNumber}</Typography></Grid>
              <Grid><Typography variant="h5" color="initial">Водій: {row.driver}</Typography></Grid>
              <Grid xs>
                <Typography variant="caption">Редагувати картку</Typography>
              </Grid>
              <Grid xs onClick={() => handleShowDetail(index)}>
                <Typography variant="caption">Деталі перевезення</Typography>
              </Grid>
            </Grid>
            <Accordion variant="div" expanded={openAccordionIndex === index}>
              <AccordionSummary sx={{display: "none"}}>
              </AccordionSummary>
              <AccordionDetails >
                <Grid container>
                  <Grid xs={6} md><Typography variant="body1" color="initial">555</Typography></Grid>
                  <Grid xs={6} md><MapRoute index={index} coordinates={[49.83826, 24.02324, 50.4501, 30.5234]}/>
                  
                  </Grid>

                </Grid>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>
      ))}
    </Container>
  );
};

export default Shipping;




