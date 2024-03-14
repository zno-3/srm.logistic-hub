import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";
import SwitchLang from "../../components/LangSwitch/LangSwitch";

function PasswordReset() {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.fieldRequired")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values)); // Send email to reset password
    },
  });

  const emailError = formik.touched.email && formik.errors.email;

  return (
    <>
      <Box sx={{ width: "1000px", margin: "0 auto" }}>
        <Grid sx={{ width: "450px", margin: "0 auto", textAlign: "right" }}>
          <SwitchLang />
        </Grid>

        <Grid
          container
          xs={12}
          md
          sx={{ width: "450px", margin: "10% auto 0", p: 3 }}
        >
          <Typography variant="h3" color="background">
            {t("auth.resetPassword")}
          </Typography>
          <Typography color="background">
            {t("auth.enterEmailReset")}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="e-mail"
              variant="filled"
              name="email"
              value={formik.values.email}
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ my: 1 }}
              fullWidth
              error={!!emailError}
              helperText={emailError || t("auth.yourEmail")}
            />

            <Grid  sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 8, my: 4 }}
              >
                {t("auth.reset")}
              </Button>
            </Grid>
            <Grid xs={12}>
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "1.2em" }}>
                  {t("auth.rememberPassword")}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.2em", ml: 1 }}
                  color="primary"
                  component={Link}
                  to={"/login"}
                >
                  {t("auth.signin")}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </>
  );
}

export default PasswordReset;
