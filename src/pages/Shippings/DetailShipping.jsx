import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useTranslation } from "react-i18next";

import RouteMap from "../../components/Maps/RouteMap";

function DetailShipping({ data }) {

  const { t } = useTranslation();

  return (
    
      <RouteMap />
    
  );
}

export default DetailShipping;
