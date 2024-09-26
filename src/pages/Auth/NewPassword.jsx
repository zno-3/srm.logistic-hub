import { useNavigate } from "react-router-dom";
import axios from "axios";
import SwitchLang from "../../components/General/LangSwitch";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Paper,
  Link,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useTranslation } from "react-i18next";
import config from "../../config";
import { useParams } from "react-router-dom";
import { useState } from "react";

function NewPassword() {
  const [resetResult, setResetResult] = useState(null);

  const [delayOver, setDelayOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { jwt } = useParams();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t("validation.fieldRequired"))
      .min(6, t("validation.atLeast6")),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.fieldRequired")),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      values = { ...values, jwt: jwt };
      axios
        .post(
          config.serverUrl + "/PHP-Login/login/ajax/resetformsubmit.php",
          values
        )
        .then((res) => {
            setTimeout(() => {
              setDelayOver(true);
            }, 1500);

          if (res.data.status) {

            setResetResult(true);
          }else{
            setResetResult(false);
          }
          console.log(res);
        })
        .catch((error) => {
          setTimeout(() => {
            setDelayOver(true);
          }, 1500);
          setResetResult(false);
          console.log(error);
          //showSnackbar(t(error.response.data.message), "error");
        });
    },
  });
  const errors = {
    password: formik.touched.password && formik.errors.password,
    confirm: formik.touched.confirm && formik.errors.confirm,
  };

  function ResetProcess() {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Оновлення паролю ...
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  function ResetSuccess() {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Пароль змінено
        </Typography>
        <Button component={Link} variant="contained" href="/login">
          Увійти
        </Button>
      </Box>
    );
  }

  function ResetError() {
    const handleReload = () => {
      window.location.reload();
    };
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Сталась помилка
        </Typography>
        <Button variant="contained" onClick={handleReload}>
          Спробувати ще раз
        </Button>
      </Box>
    );
  }

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
        {!loading && !resetResult && (
          <Box sx={{ maxWidth: "350px" }}>
            <Typography variant="h1">{t("auth.resetPassword")}</Typography>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                label={t("auth.newPass")}
                variant="filled"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                autoComplete="off"
                sx={{ my: 3 }}
                size="small"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                label={t("auth.confirm")}
                variant="filled"
                name="confirm"
                type="password"
                value={formik.values.confirm}
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                autoComplete="off"
                sx={{ my: 1 }}
                size="small"
                fullWidth
                error={!!errors.confirm}
                helperText={errors.confirm}
              />

              <Grid sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 8, my: 4 }}
                >
                  {t("auth.installNewPassword")}
                </Button>
              </Grid>
            </form>
          </Box>
        )}
        {loading && !delayOver && <ResetProcess />}
        {delayOver  && resetResult && <ResetSuccess />}
        {delayOver  && !resetResult && <ResetError />}
      </Paper>
    </Box>
  );
}




export default NewPassword;
