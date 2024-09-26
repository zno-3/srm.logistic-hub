import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from "../../config";
import { useUI } from "../../context/CustomIUProvider";
import { Box, Typography, TextField, Link, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";
import SwitchLang from "../../components/General/LangSwitch";

function PasswordReset() {
  const { t, i18n } = useTranslation();
  const { showSnackbar, showDialog, closeDialog } = useUI();
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
      values = { ...values, language: i18n.language };
      axios
        .post(
          config.serverUrl + "/PHP-Login/login/ajax/sendresetemail.php",
          values
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.type == "success") {
            showDialog({
              title: t("auth.resetPassword"),
              content: t("auth." + res.data.msg),
              footer: <Button onClick={closeDialog}>ok</Button>,
            });
          } else {
            showSnackbar(t("errors." + res.data.msg), res.data.type);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },
  });

  const emailError = formik.touched.email && formik.errors.email;

  return (
    <Box sx={{ width: "100vw", height: "100vh", p: 2 }}>
      <Box xs={12} sx={{ p: 3, position: "absolute", top: 0, right: 0 }}>
        <SwitchLang />
      </Box>
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
        <Box sx={{ maxWidth: "350px" }}>

            <Typography variant="h1" sx={{mb:3}}>
              {t("auth.resetPassword")}
            </Typography>
            <Typography variant="subtitle2" sx={{mb:2}}>
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
                helperText={emailError}
              />

              <Grid sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ px: 8, my: 4 }}
                >
                  {t("auth.reset")}
                </Button>
              </Grid>
              <Grid xs={12}>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                  <Link
                    href="/login"
                    variant="body2"
                  >
                    {t("auth.backToLogin")}
                  </Link>
                </Grid>
              </Grid>
            </form>

        </Box>
      </Paper>
    </Box>
  );
}

export default PasswordReset;
