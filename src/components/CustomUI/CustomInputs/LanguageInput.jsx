import { Autocomplete, Chip, Box, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from "react-i18next";
import Label from "./Label";

const LanguageInput = ({ label, notNecessarily, formik, ...props }) => {
  const { t } = useTranslation();
  const languagesOptions = ["en", "ua", "pl", "de", "zh", "fr"];

  return (
    <Box sx={{ mb: 4 }}>
      <Label label={label} notNecessarily={notNecessarily} />
      <Grid container>
        <Grid xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={languagesOptions}
            getOptionLabel={(option) => t("languages." + option)}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, value) => {
              formik.setFieldValue("languages", value);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option}
                  label={t("languages." + option)}
                  {...getTagProps({ index })}
                  size="small"
                  color="lightgreen"
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

export default LanguageInput;
