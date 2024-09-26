import React from "react";
import { Box, Grid, FormHelperText } from "@mui/material";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Label from "./Label";

const PhoneInputComponent = ({
  labeloff,
  label,
  error,
  notNecessarily,
  ...props
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Label label={label} notNecessarily={notNecessarily} />
      <Grid container>
        <Grid item xs={12}>
          <PhoneInput
            preferredCountries={["ua"]}
            {...props}
            country={"ua"}
            value=""
            inputStyle={{
              backgroundColor: "#F2F2F7",
              height: "43px",
              width: "100%",
              border: "none",
            }}
            containerStyle={{
              borderBottom: "1px solid #0000006b",
            }}
            buttonStyle={{
              backgroundColor: "#F2F2F7",
              border: "none",
              borderRight: "1px solid #cdcdcd",
            }}
          />
          <FormHelperText error={!!error}>{error}</FormHelperText>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PhoneInputComponent;
