import { Paper, Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";


function SkeletonCard() {
  return (
    <Paper
      elevation={4}
      sx={{
        width: "300px",
        m: 1,
        p: 1.5,
        lineHeight: 1,
        color: "#0E1C36",
        backgroundColor: "#F2F2F7",
      }}
    >
      <Grid container>
        <Grid sx={{ width: "64px" }}>
          <Skeleton variant="rounded" width={64} height={64} />
        </Grid>

        <Grid xs sx={{ ml: 1.5 }}>
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
        </Grid>

        <Grid sx={{mt:0.8, mr: 1.8}}>
          <Skeleton variant="circular" width={5} height={5} sx={{ mt: 0.25 }}/>
          <Skeleton variant="circular" width={5} height={5} sx={{ mt: 0.25 }} />
          <Skeleton variant="circular" width={5} height={5} sx={{ mt: 0.25 }} />
        </Grid>

        <Paper elevation={0} sx={{ mt: 0.5, p: 1.5, width: "100%" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", width: "15px" }}
            />{" "}
            <Skeleton variant="text" sx={{ width: "50px" }} />
          </Stack>

          <Skeleton
            variant="text"
            sx={{ mt: 1, fontSize: "0.5rem", width: "55px" }}
          />

          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "150px" }} />

          <Skeleton
            variant="text"
            sx={{ mt: 1, fontSize: "0.5rem", width: "55px" }}
          />

          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "150px" }} />
        </Paper>
      </Grid>
    </Paper>
  );
}

export default SkeletonCard;
