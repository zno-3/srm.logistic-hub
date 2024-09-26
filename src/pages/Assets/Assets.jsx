import React, { useState, Suspense } from "react";
//import "../../utils/i18next";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Layouts/Header/Header";

const DriversTab = React.lazy(() => import("./AssetsTabs/DriversTab"));
const VehiclesTab = React.lazy(() => import("./AssetsTabs/VehiclesTab"));
const TrailersTab = React.lazy(() => import("./AssetsTabs/TrailersTab"));

function Assets() {
  const { asset } = useParams();
  const links = ["drivers", "vehicles", "trailers"];

  let initialTab;
  switch (asset) {
    case "drivers":
      initialTab = 0;
      break;
    case "vehicles":
      initialTab = 1;
      break;
    case "trailers":
      initialTab = 2;
      break;
    default:
      initialTab =0;
      break;
  }

  const { t } = useTranslation();
  const authToken = useAuthHeader();
  const navigate = useNavigate();
  const headers = {
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json",
    },
  };

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleSwitchAssets = (tabId) => {
    const newAsset = links[tabId]; // Нове значення для :asset
    const newPath = `/assets/${newAsset}`;
    navigate(newPath, { replace: true });
    setActiveTab(tabId);
  };

  return (
    <>
      <Grid container xs={12}  direction="column" sx={{ my: 2, order: { sm: 2, md: 1 } }}>
        <Header
          title={t("pages.assets")}
          activeLink={initialTab}
          links={links}
          onSwitch={handleSwitchAssets}
        />
        <Grid>
          <Suspense fallback={<div>Loading...</div>}>
            {activeTab === 0 && <DriversTab />}
            {activeTab === 1 && <VehiclesTab />}
            {activeTab === 2 && <TrailersTab />}
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}
export default Assets;
