import { useState } from "react";
import {
  FormHelperText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
  Link,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import SwitchLang from "../../components/General/LangSwitch";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { useUI } from "../../context/CustomIUProvider";
import registrationImage from "../../assets/img/registration.jpg";
import GoogleAuth from "./GoogleAuth";

function Auth() {
  const { t } = useTranslation();
  const { showSnackbar } = useUI();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.fieldRequired")),
    password: Yup.string()
      .required(t("validation.fieldRequired"))
      .min(6, t("validation.atLeast6")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(config.serverUrl + "/PHP-Login/login/ajax/checklogin.php", values)
        .then((res) => {
          console.log(res);
          const data = res.data.response;
          if (data.status === true) {
            if (
              signIn ({
                auth: {
                  token: data.token,
                  type: "Bearer",
                },
                //refresh: data.token,
                userState: {
                  firstname: data.firstname,
                  lastname: data.lastname,
                  uid: data.id,
                  company_id: data.company_id,
                },
              })
            ) {
              navigate("/dashboard");
              // Only if you are using refreshToken feature
              // Redirect or do-something
            } else {
              //Throw error
              showSnackbar("Помилка авторизації", "error");
            }
          } else showSnackbar(t(data), "error");
        })
        .catch((error) => {
          console.log(error);
          //showSnackbar(t(error.response.data.message), "error");
        });
    },
  });
  const errors = {
    email: formik.touched.email && formik.errors.email,
    passsword: formik.touched.password && formik.errors.password
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: '100%', p: 2}}
    >
      <Paper
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: "50%",
          borderRadius: "14px",
          m: 2,
          background: `url(${registrationImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Paper>
      <Paper
        sx={{
          m: 2,
          width: {
            xs: "100%",
            md: "50%",
          },
          borderRadius: "14px",
          background: "#FDFDFD",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box xs={12} sx={{ p: 3, position: "absolute", top: 0, right: 0 }}>
          <SwitchLang />
        </Box>

        <Box sx={{ maxWidth: "320px", m: "0 auto" }}>
          <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h1" color="primary">
              {t("auth.login")}
            </Typography>
            <Link
              href="/registration"
              variant="body2"
              sx={{ alignSelf: "flex-end" }}
            >
              {t("auth.notAuth")}
            </Link>
          </Grid>

          <Grid>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label={t("auth.yourEmail")}
                variant="filled"
                name="email"
                value={formik.values.email}
                autoComplete="off"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                sx={{ my: 1 }}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />

              <FormControl fullWidth variant="filled" sx={{ mt: 2 }}>
                <InputLabel error={!!errors.password} htmlFor="password">
                  {t("auth.pass")}
                </InputLabel>
                <FilledInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => formik.handleChange(e)}
                  onBlur={formik.handleBlur}
                  error={!!errors.password}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <FormHelperText error={!!errors.password}>
                  {errors.password}
                </FormHelperText>
              </FormControl>
              <Grid sx={{ textAlign: "right", mt: 2 }}>
                <Link
                  variant="body2"
                  href="/reset-password"
                >
                  {t("auth.forgotPass")}
                </Link>
              </Grid>
              <Grid sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ px: 6, my: 4 }}
                >
                  {t("general.continue")}
                </Button>
              </Grid>
            </form>
            <GoogleAuth />
          </Grid>
        </Box>
      </Paper>
    </Stack>
  );
}

export default Auth;
