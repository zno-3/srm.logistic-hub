import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link, useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import axios from "axios";
import SwitchLang from "../../components/LangSwitch/LangSwitch";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormHelperText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import config from "../../config";
//import { useDispatch } from 'react-redux';
//import { showSnackbar } from '../../store/snackbarReduser';

function Auth() {
  const { t } = useTranslation();
  const authUser = useAuthUser();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
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
      alert(JSON.stringify(values));
      axios
        .post(config.rootUrl + "/server/axios/auth/login.php", values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (
              signIn({
                auth: {
                  token: res.data.jwt,
                  type: "Bearer",
                },
                userState: { name: "React User", uid: 123456 },
              })
            ) {
              setTimeout(() => {
                console.log(isAuthenticated());
              }, 100);

              //navigate("/");
              // Only if you are using refreshToken feature
              // Redirect or do-something
            } else {
              //Throw error
              console.log("Sry error");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          //dispatch(showSnackbar('Це повідомлення Snackbar Alert', 'info'));
          //console.log(error);
        });
    },
  });

  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;

  //const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
            {t("auth.wellcome")}
          </Typography>
          <Typography color="background">{t("auth.forStart")}</Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="e-mail"
              variant="filled"
              name="email"
              value={formik.values.email}
              autoComplete="off"
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              sx={{ my: 1 }}
              fullWidth
              error={!!emailError}
              helperText={emailError || t("auth.yourEmail")}
            />

            <FormControl fullWidth variant="filled" sx={{ mt: 2 }}>
              <InputLabel error={!!passwordError} htmlFor="password">
                {t("auth.pass")}
              </InputLabel>
              <FilledInput
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                error={!!passwordError}
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

              <FormHelperText error={passwordError}>
                {passwordError || t("auth.yourPassword")}
              </FormHelperText>
            </FormControl>
            <Grid sx={{ textAlign: "right", mt: 2 }}>
              <Typography
                color="primary"
                sx={{ fontSize: "1.2em" }}
                component={Link}
                to={"/reset-password"}
              >
                {t("auth.forgotPass")}
              </Typography>
            </Grid>
            <Grid sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 8, my: 4 }}
              >
                {t("auth.signin")}
              </Button>
            </Grid>
            <Grid xs={12}>
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "1.2em" }}>
                  {" "}
                  {t("auth.notAuth")}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.2em", ml: 1 }}
                  color="primary"
                  component={Link}
                  to={"/registration"}
                >
                  {t("auth.register")}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </>
  );
}

export default Auth;
