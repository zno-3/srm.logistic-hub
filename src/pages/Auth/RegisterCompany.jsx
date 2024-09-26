import { Box, Button, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import config from "../../config";
import { useUI } from "../../context/CustomIUProvider";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
//import useSignOut from "react-auth-kit/hooks/useSignOut";


function RegisterCompany() {
  const signIn = useSignIn();
  //const signOut = useSignOut();
  const authToken = useAuthHeader();
    const navigate = useNavigate();
  const { t } = useTranslation();

  const { showSnackbar } = useUI();
  const auth = useAuthUser();
  const uid = auth.uid;
  const company_id = auth.company_id;

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(t("validation.fieldRequired")),
    lastname: Yup.string().required(t("validation.fieldRequired")),
    company: Yup.string().required(t("validation.fieldRequired")),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      company: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const headers = {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      };
      values = { ...values, uid: uid };

      axios
        .post(
          `${config.serverUrl}/PHP-Login/login/ajax/createcompany.php`,
          values,
          headers
        )
        .then((response) => {
          console.log(response.data.result); 
          if(response.data.result === 'success') {
            console.log(response.data.result);           
            //signOut();
           if ( signIn ({
              auth: {
                token: authToken.match(/Bearer\s(\S+)/)[1],
                type: "Bearer",
              },
              //refresh: data.token,
              userState: {
                uid: uid,
                company_id: response.data.company_id,
                company_name: formik.values.company
              },
            })){
               navigate("/dashboard");
            }else{
              
              
            console.log(uid);
            console.log(authToken);
            console.log(company_id);
           
          
            showSnackbar("Щось пішло не так, спробуйте ще раз", "error")
          }
        }})
        .catch((error) => {
          if (error.response) {
            console.error(error);
            if (error.response.status === 401) {
              showSnackbar(t(error.response.data.message), "error");
            } else if (error.response.status === 500) {
              showSnackbar(t("errors.server"), "error");
            }
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
        });
    },
  });

  const errors = {
    firstname: formik.touched.firstname && formik.errors.firstname,
    lastname: formik.touched.lastname && formik.errors.lastname,
    email: formik.touched.company && formik.errors.company,
  };

  return (
    <>
      <SideMenu />
      <Grid
        container
        sx={{
          width: "100%",
          position: "relative",
          m: 2,
          p: 2,
          borderRadius: "14px",
          background: "#F5F5F5",
          direction: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "350px", m: "0 auto" }}>
          {!company_id ? (
            <>
              <Typography variant="h1">
                Розкажіть про себе та свою компанію
              </Typography>
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
                  label={t("general.companyName")}
                  variant="filled"
                  name="company"
                  value={formik.values.company}
                  onChange={(e) => formik.handleChange(e)}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  sx={{ my: 1 }}
                  size="small"
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ my: 4 }}
                >
                  {t("general.continue")}
                </Button>
              </form>
            </>
          ) : (
            <Typography variant="h1">
              У вас вже зареєстрована компанія
            </Typography>
          )}
        </Box>
      </Grid>
    </>
  );
}

export default RegisterCompany;
