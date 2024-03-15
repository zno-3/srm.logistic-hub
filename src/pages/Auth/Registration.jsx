import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  InputAdornment,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import SwitchLang from "../../components/LangSwitch/LangSwitch";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../../config";


function Registration() {
  useEffect(() => {
    recaptchaRef.current.execute();
  }, []);
  const { t, i18n } = useTranslation();
  const recaptchaRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(t("validation.fieldRequired")),
    lastname: Yup.string().required(t("validation.fieldRequired")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.fieldRequired")),
    password: Yup.string()
      .required(t("validation.fieldRequired"))
      .min(6, t("validation.atLeast6")),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.fieldRequired")),
    agree: Yup.boolean().oneOf([true], t("validation.agreementRequired")),
  });
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isVerified) {
        values = { ...values, language: i18n.language};
        console.log(values);
        axios
          .post(config.rootUrl + "/sever/auth/create_user.php", values)
          .then((res) => {
            console.log(res);
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
    firstname: formik.touched.firstname && formik.errors.firstname,
    lastname: formik.touched.lastname && formik.errors.lastname,
    email: formik.touched.email && formik.errors.email,
    passsword: formik.touched.password && formik.errors.password,
    confirm: formik.touched.confirm && formik.errors.confirm,
    agree: formik.touched.agree && formik.errors.agree,
  };

  const hendleCapcha = () => {
    setIsVerified(true);
  };

  return (
    <Box sx={{ width: "1000px", margin: "0 auto" }}>
      <SwitchLang />
      <Grid
        container
        xs={12}
        md
        sx={{ width: "450px", margin: "10% auto 0", p: 3 }}
      >
        <Typography variant="h3" color="primary">
          {t("auth.registration")}
        </Typography>
        <Typography color="primary">{t("auth.registerYouself")}</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
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
          />
          <TextField
            label="Email"
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
              {t("auth.pass")}
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

            <FormHelperText error={errors.passsword}>
              {errors.passsword}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="filled" sx={{ my: 1 }}>
            <InputLabel error={!!errors.confirm} htmlFor="confirm">
              Confirm passsword
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

            <FormHelperText error={errors.confirm}>
              {errors.confirm}
            </FormHelperText>
          </FormControl>

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
                <>
                  {t("auth.agree")}{" "}
                  <Link href="/agreement">{t("auth.agreement")}</Link>
                </>
              }
            />
            <FormHelperText error={errors.agree}>{errors.agree}</FormHelperText>
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
              color="primary"
              sx={{ px: 8, my: 4 }}
            >
              {t("auth.register")}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
}

export default Registration;
