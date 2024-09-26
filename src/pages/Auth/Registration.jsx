import { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  InputAdornment,
  FilledInput,
  Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import axios from "axios";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import SwitchLang from "../../components/General/LangSwitch";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../../config";
import { useUI } from "../../context/CustomIUProvider";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { PhoneInput } from "../../components/CustomUI/CustomInputs";
import registrationImage from "../../assets/img/registration.jpg";

function Registration() {
  const { t, i18n } = useTranslation();
  const { showSnackbar, showDialog, closeDialog } = useUI();
  const navigate = useNavigate();
  useEffect(() => {
    recaptchaRef.current.execute();
  }, []);

  const recaptchaRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const validationSchema = Yup.object().shape({
    //firstname: Yup.string().required(t("validation.fieldRequired")),
    //lastname: Yup.string().required(t("validation.fieldRequired")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.fieldRequired")),
    password: Yup.string()
      .required(t("validation.fieldRequired"))
      .min(6, t("validation.atLeast6")),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.fieldRequired")),
    phone: Yup.string()
      .required(t("validation.fieldRequired"))
      .min(12, t("validation.phoneValid")),
    agree: Yup.boolean().oneOf([true], t("validation.agreementRequired")),
  });

  const formik = useFormik({
    initialValues: {
      //firstname: "",
      //lastname: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isVerified) {
        values = { ...values, language: i18n.language };
        axios
          .post(
            config.serverUrl + "/PHP-Login/login/ajax/createuser.php/",
            values
          )
          .then((res) => {
            console.log(res);
            if (res.data.type === "success") {
              setRegistrationSuccess(true);
            } else {
              showSnackbar(t(res.data.msg), res.data.type);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Please verify reCAPTCHA.");
      }
    },
  });
  const errors = {
    //firstname: formik.touched.firstname && formik.errors.firstname,
    //lastname: formik.touched.lastname && formik.errors.lastname,
    email: formik.touched.email && formik.errors.email,
    passsword: formik.touched.password && formik.errors.password,
    confirm: formik.touched.confirm && formik.errors.confirm,
    phone: formik.touched.phone && formik.errors.phone,
    agree: formik.touched.agree && formik.errors.agree,
  };

  const hendleCapcha = () => {
    setIsVerified(true);
  };

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
        <Box>
          {!registrationSuccess && (
            <Box sx={{ maxWidth: "320px", m: "0 auto" }}>
              <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h1" color="primary">
                  {t("auth.registration")}
                </Typography>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: "flex-end" }}
                >
                  {t("auth.haveAuth")}
                </Link>
              </Grid>

              <Grid>
                <form onSubmit={formik.handleSubmit}>
                  {/*<TextField
                label={t("general.firstname")}
                variant="filled"
                name="firstname"
                value={formik.values.firstname}
                autoComplete="off"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                sx={{ my: 1 }}
                size="small"
                fullWidth
                error={!!errors.firstname}
                helperText={errors.firstname}
              />
              <TextField
                label={t("general.lastname")}
                variant="filled"
                name="lastname"
                autoComplete="off"
                value={formik.values.lastname}
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                sx={{ my: 1 }}
                size="small"
                fullWidth
                error={!!errors.lastname}
                helperText={errors.lastname}
              />*/}
                  <TextField
                    label={t("auth.enterEmail")}
                    variant="filled"
                    name="email"
                    value={formik.values.email}
                    onChange={(e) => formik.handleChange(e)}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    sx={{ my: 1 }}
                    size="small"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />

                  <FormControl fullWidth variant="filled" sx={{ my: 1 }}>
                    <InputLabel error={!!errors.passsword} htmlFor="password">
                      {t("auth.createPass")}
                    </InputLabel>
                    <FilledInput
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      error={!!errors.passsword}
                      autoComplete="off"
                      size="small"
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

                    <FormHelperText error={!!errors.passsword}>
                      {errors.passsword}
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth variant="filled" sx={{ my: 1 }}>
                    <InputLabel error={!!errors.confirm} htmlFor="confirm">
                      {t("auth.confirm")}
                    </InputLabel>
                    <FilledInput
                      type={showConfirm ? "text" : "password"}
                      name="confirm"
                      value={formik.values.confirm}
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      error={!!errors.confirm}
                      autoComplete="off"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirm(!showConfirm)}
                            edge="end"
                          >
                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error={!!errors.confirm}>
                      {errors.confirm}
                    </FormHelperText>
                  </FormControl>

                  <PhoneInput
                    name="phone"
                    id="phone"
                    onChange={(e) => formik.setFieldValue("phone", e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    required={true}
                    error={errors.phone}
                    placeholder={t("auth.yourPhoneNumber")}
                  />

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.agree}
                          onChange={formik.handleChange}
                          name="agree"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          {t("auth.agree")}
                          <Link href="/agreement">{t("auth.offer")}</Link>{" "}
                          {t("general.and")}{" "}
                          <Link href="/agreement">{t("auth.privacy")}</Link>
                        </Typography>
                      }
                    />
                    <FormHelperText error={!!errors.agree}>
                      {errors.agree}
                    </FormHelperText>
                  </FormGroup>

                  <ReCAPTCHA
                    sitekey={config.reCapchaKey}
                    onChange={hendleCapcha}
                    ref={recaptchaRef}
                    size="invisible"
                  />
                  <Grid sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ px: 8, my: 4 }}
                    >
                      {t("auth.register")}
                    </Button>
                  </Grid>
                  <GoogleAuth />
                </form>
              </Grid>
            </Box>
          )}
          {registrationSuccess && (
            <Box sx={{ textAlign: "center", width: "350px" }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Дякуемо за реєстрацію
              </Typography>{" "}
              <Typography  component={Box} variant="body" sx={{ mb: 4 }}>
                Перевірте вашу пошту. Ми віпдправили Вам лист. Скористайтесь
                інструкціею в листі щоб підтрведити Ваш обліковий запис. Після
                цього ви зможете увійти до системи.
              </Typography>
              <Button
                component={Link}
                fullWidth
                color="secondary"
                variant="contained"
                href="/login"
              >
                Увійти
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Stack>
  );
}

export default Registration;
