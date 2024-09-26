import { Box, Pagination, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import { useTranslation } from "react-i18next";
import StatusFilter from "../../components/Assets/StatusFilter";
import Header from "../../components/Layouts/Header/Header";
import { Link } from "react-router-dom";
import SkeletonCard from "../../components/Assets/SkeletonCard";
import useAssets from "../../hooks/useAssets";
import AddNewCard from "../../components/Cards/AddNewCard";

function AssetsPage({ type, CardComponent, linkToNew }) {
  const { t } = useTranslation();

  const links = ["drivers", "vehicles", "trailers"];

  const { loading, page, setPage,  assets, currentAssets, statuses, handleDeleteItem } =
    useAssets(type);


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
            title={t("pages.assets")}
            activeLink={links.indexOf(type)}
            links={links}
            prefix="/assets"
          />

          <Box sx={{ p: 0.5, mt: 2, backgroundColor: "#f2f2f7" }}>
            <StatusFilter type={type} statuses={statuses} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Grid container>
              {loading
                ? Array(5)
                    .fill()
                    .map((_, index) => <SkeletonCard key={index} />)
                : currentAssets.map((item, index) => (
                    <CardComponent
                      data={item}
                      key={index}
                      onDelete={() => handleDeleteItem(item.id)}
                    />
                  ))}
              <Link to={linkToNew}>
                <AddNewCard item={type} />
              </Link>
            </Grid>
          </Box>
          <Stack spacing={2} alignItems="center" mt={2}>

            <Pagination
              count={Math.ceil(assets.length / 10)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AssetsPage;
