import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import Label from "./Label";
const DateInput = ({ labeloff, label, notNecessarily, ...props }) => {
  return (
    <Box >
      <Label label={label} notNecessarily={notNecessarily} />
      <Grid container>
        <Grid xs={12}>
          <MuiDatePicker {...props}  />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DateInput;
