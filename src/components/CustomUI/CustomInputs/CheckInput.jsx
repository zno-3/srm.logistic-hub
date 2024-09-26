import { Box, Checkbox} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Label from "./Label";
const TextInput = ({ labeloff, label, notNecessarily, ...props }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Label label={label} notNecessarily={notNecessarily} />
      <Grid container>
        <Grid xs={12}>
          <Checkbox {...props} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextInput;