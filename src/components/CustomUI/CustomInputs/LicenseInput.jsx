import { Autocomplete, Chip, Box, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from "react-i18next";
import Label from "./Label";
const LicenseInput = ({ label, notNecessarily, formik, ...props }) => {
  const { t } = useTranslation();

  const licenseOptions = [
    "A1",
    "A2",
    "A",
    "B",
    "BE",
    "C1",
    "C1E",
    "C",
    "CE",
    "D1",
    "D1E",
    "D",
    "DE",
    "M",
    "T",
  ];
  return (
    <Box sx={{ mb: 4 }}>
      <Label label={label} notNecessarily={notNecessarily} />
      <Grid container>
        <Grid xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={licenseOptions}
            getOptionLabel={(option) => option}
            value={formik.values.licenses}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, value) => formik.setFieldValue("licenses", value)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option}
                  label={option}
                  {...getTagProps({ index })}
                  size="small"
                  color="lightblue"
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} placeholder={t("general.add")} />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LicenseInput;
