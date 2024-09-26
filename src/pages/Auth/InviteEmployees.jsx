import {
  Box,
  Stack,
  Paper,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUI } from "../../context/CustomIUProvider";
import axios from "axios";
import config from "../../config";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function InviteEmployees() {
  const { showSnackbar } = useUI();
  const { t, i18n } = useTranslation();
  const auth = useAuthUser();
  const company = auth.company_id;
  // Схема валідації для масиву запрошень
  const validationSchema = Yup.object().shape({
    invites: Yup.array().of(
      Yup.object().shape({
        email: Yup.string()
          .email(t("validation.invalidEmail"))
          .required(t("validation.fieldRequired")),
      })
    ),
  });

  return (
    <Stack direction="row" spacing={2} sx={{ width: "100%", p: 2 }}>
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
        <Formik
          initialValues={{
            invites: [{ email: "" }],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values = { ...values, language: i18n.language, company: company };
            console.log(values);
            axios
            .post(config.serverUrl + "/PHP-Login/login/ajax/inviteemploees.php", values)
            .then((res) => {
              console.log(res);
              const data = res.data.response;
              if (data.status === true) {
                
              } else showSnackbar(t(data), "error");
            })
            .catch((error) => {
              console.log(error);
              //showSnackbar(t(error.response.data.message), "error");
            });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <FieldArray
                name="invites"
                render={({ push, remove }) => (
                  <Box>
                    {values.invites.map((invite, index) => (
                      <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      sx={{
                        position: "relative",
                        "&:hover .delete-button": {
                          opacity: 1,
                          visibility: "visible",
                        },
                      }}
                    >
                        <TextField
                          variant="filled"
                          name={`invites[${index}].email`}
                          value={invite.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          sx={{ my: 1, flexGrow: 1 }}
                          size="small"
                          fullWidth
                          error={
                            !!(
                              touched.invites?.[index]?.email &&
                              errors.invites?.[index]?.email
                            )
                          }
                          helperText={
                            touched.invites?.[index]?.email &&
                            errors.invites?.[index]?.email
                          }
                        />
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => remove(index)}
                          className="delete-button"
                          sx={{
                            ml: 2,
                            opacity: 0,
                            visibility: "hidden",
                            transition: "opacity 0.3s ease, visibility 0.3s ease",
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      onClick={() => push({ email: "" })}
                      sx={{ mt: 2 }}
                      variant="contained"
                    >
                      +
                    </Button>
                  </Box>
                )}
              />
              <Button type="submit" sx={{ mt: 2 }} variant="contained">
                Відправити
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Stack>
  );
}

export default InviteEmployees;
