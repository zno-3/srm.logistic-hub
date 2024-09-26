
import SwitchLang from "../components/General/LangSwitch";

import { Box, Typography, Paper} from "@mui/material";

import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();





  return (


    <Box sx={{ width: "100vw", height: "100vh", p: 2 }}>
    <Box xs={12} sx={{ p: 3, position: "absolute", top: 0, right: 0 }}>
      <SwitchLang />
    </Box>
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        background: "#FDFDFD",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "350px", textAlign: "center"}}>

      <Typography variant="h1" color="background">
            404
          </Typography>{" "}
          <Typography variant="h2" color="background">
            Page Not Found
          </Typography>



      </Box>
    </Paper>
  </Box>

  );
}

export default NotFoundPage;
