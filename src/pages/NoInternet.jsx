import { Box, Typography, Paper } from "@mui/material";

function NoInternet() {
  return (
    <Box sx={{ width: "100vw", height: "100vh", p: 2 }}>
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
        <Box sx={{ maxWidth: "350px", textAlign: "center" }}>
          <Typography variant="h1">
            No Internet
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default NoInternet;
