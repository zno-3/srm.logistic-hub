import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Label from "./Label";

const NumberInput = ({ label, min, max, decimalPlaces, notNecessarily, formik, ...props }) => {

  const handleChange = (event) => {
    let value = event.target.value.replace('.', ',');
    value = value.replace(/[^0-9,]/g, '');

    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts.slice(1).join('');
    }
    if (parts[1]?.length > decimalPlaces) {
      parts[1] = parts[1].slice(0, decimalPlaces);
      value = parts.join(',');
    }

    let numericValue = parseFloat(value.replace(',', '.'));

    if (!isNaN(numericValue)) {
      if (numericValue < min) {
        value = min.toFixed(decimalPlaces).replace('.', ',');
      } else if (numericValue > max) {
        value = max.toFixed(decimalPlaces).replace('.', ',');
      }
    }

    formik.setFieldValue(props.name, value);
    //event.target.value = value;
  };

  const handleBlur = (event) => {
    let value = event.target.value.replace(',', '.');
    let numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      numericValue = min;
    } else if (numericValue < min) {
      numericValue = min;
    } else if (numericValue > max) {
      numericValue = max;
    }

    const formattedValue = numericValue.toFixed(decimalPlaces).replace('.', ',');
    formik.setFieldValue(props.name, formattedValue);
    //event.target.value = formattedValue;
  };



  return (
    <Box sx={{ mb: 4 }}>
      <Label label={label} notNecessarily={notNecessarily} />
      <Grid container>
        <Grid xs={12}>
          <TextField
            {...props}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NumberInput;
