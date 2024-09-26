import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function InfoIconBlock({ icon, items }) {
  return (
    <Grid container spacing={2} >
      <Grid xs={12} sx={{ mb: -2 }}>
        <Box sx={{ width: 24, height: 24, fill: "#0E1C36" }}>{icon} </Box>
      </Grid>

      {items.map((item, index) => (
        <Grid container
          key={index}
          xs={12}
          sx={{ mt: 1, borderBottom: "solid 1px #E1E1E1", color: "#0E1C36" }}
          justifyContent="space-between"
        >
          <Typography>{item.option}</Typography>
          <Typography sx={{ ml: 3 }}>{item.data}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default InfoIconBlock;
