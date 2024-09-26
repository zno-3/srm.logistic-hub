import { Divider, IconButton, Paper, Button, Typography, Stack } from "@mui/material";
import {
  TextInput,
  CheckInput,
  DateInput,
  PhoneInput,
  LanguageInput,
  LicenseInput,
  NumberInput,
} from "../../components/CustomUI/CustomInputs";
import axios from "axios";
import config from "../../config";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AvatarUploader from "../../components/Uploader/AvatarUploader";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddSvg from "../../assets/icons/add-btn.svg";
import { useUI } from "../../context/CustomIUProvider";
import AddSocialDialog from "./Dialogs/AddSocialDialog";
import DocsUploader from "../../components/Uploader/DocsUploader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SideMenu from "../../components/Menu/SideMenu/SideMenu";
import SelectAsset from "../../components/Assets/SelectAsset";

function AddDriver() {
  const navigate = useNavigate();
  const { showSnackbar, showDialog } = useUI();
  const [telegram, setTelegram] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);
  const [viber, setViber] = useState([]);

  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();

  const uploadDocsTypes = [
    { title: "driverLicence" },
    { title: "driverPassport" },
    { title: "driverAbroadPassport" },
    { title: "other" },
  ];

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      surname: "",
      birthday: "",
      phone: "",
      email: "",
      licenses: [],
      languages: [],
      salary: "",
      exp: 0,
      adr: false,
      avatar: "",
      telegram: "",
      viber: "",
      whatsapp: "",
    },
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });
  const [phoneNumbers, setPhoneNumbers] = useState([
    { value: "", isValid: false },
  ]);

  const handleAttachCardChange = (id) => {
    alert(id);
  };

  const handlePhoneChange = (value, index) => {
    const isValid = value.match(/^\+?[1-9]\d{1,14}$/); // Simple validation for international phone numbers
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = { value, isValid: !!isValid };

    if (isValid && index === phoneNumbers.length - 1) {
      newPhoneNumbers.push({ value: "", isValid: false });
    }

    setPhoneNumbers(newPhoneNumbers);
  };

  const handleSubmitForm = (values) => {
    values.company = company_id;
    console.log(values);
    console.log(authToken);
    const headers = {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `${config.serverUrl}/axios/assets/saveDriver.php`,
        headers
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
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
  };

  const handleAddSocialClick = () => {
    const numbers = [1, 2];
    showDialog({
      title: t("assets.drivers.messengers"),
      content: <AddSocialDialog numbers={numbers} />,
    });
  };

  const handleAvatarUpload = (avatar) => {
    formik.setFieldValue("avatar", avatar);
  };

  const { t } = useTranslation();
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
        background: "#FCFCFC",
        overflow: "auto",
      }}>
    <Grid xs={12} container spacing={3}>
      <Grid xs>
        <Paper sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" sx={{ px: 3, py: 1 }}>
            <Grid xs>
              <Typography variant="h3" xs={{ color: "primary" }}>
                {t("assets.drivers.addNewDriver")}
              </Typography>
            </Grid>
            <Grid xs="auto">
              <IconButton
                aria-label="close"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} sx={{ px: 3, pt: 3 }}>
              <Grid xs={12} md="auto">
                <AvatarUploader onAvatarUpload={handleAvatarUpload} />
                <Typography variant="h4">
                  {t("assets.drivers.messengers")}
                </Typography>
                {telegram.length + viber.length + whatsapp.length ? (
                  <Typography variant="subtitle2">
                    {t("general.added")}
                  </Typography>
                ) : null}
                <Button
                  sx={{
                    px: 2,
                  }}
                  startIcon={<img src={AddSvg} alt="Add" />}
                  onClick={handleAddSocialClick}
                >
                  {telegram.length + viber.length + whatsapp.length
                    ? "Додати ще"
                    : "Додати"}
                </Button>
              </Grid>
              <Grid xs={12} md>
                <TextInput
                  label={t("general.lastname")}
                  name="lastname"
                  placeholder="Ввсести"
                  onChange={(e) => formik.handleChange(e)}
                />
                <TextInput
                  label={t("general.firstname")}
                  name="firstname"
                  placeholder={t("general.enter")}
                  onChange={(e) => formik.handleChange(e)}
                />
                <TextInput
                  label={t("general.surname")}
                  name="surname"
                  placeholder={t("general.enter")}
                  onChange={(e) => formik.handleChange(e)}
                />
                <DateInput
                  label="Дата народження"
                  name="birthday"
                  onChange={(value) =>
                    formik.setFieldValue("birthday", value.$D)
                  }
                />

                {phoneNumbers.map((phoneNumber, index) => (
                  <PhoneInput
                    key={index}
                    onChange={(value) => {
                      handlePhoneChange(value, index);
                    }}
                    label={index ? null : "Telephone"}
                    placeholder={t("general.enter")}
                  />
                ))}
              </Grid>
              <Grid xs={12} md>
                <LicenseInput
                  label={t("assets.drivers.licenses")}
                  formik={formik}
                  notNecessarily={true}
                />
                <LanguageInput
                  label={t("assets.drivers.languages")}
                  formik={formik}
                  notNecessarily={true}
                />

                <CheckInput
                  label="ADR"
                  name="adr"
                  onChange={(e, value) => formik.setFieldValue("adr", value)}
                  value={formik.values.adr}
                  notNecessarily={true}
                />

                <NumberInput
                  label={"досвід роботи"}
                  notNecessarily={true}
                  formik={formik}
                  name="exp"
                  value={formik.values.exp}
                  min={0}
                  max={70}
                  decimalPlaces={0}
                />
              </Grid>

              <Grid container spacing={3} sx={{ px: 3 }}>
                <Grid xs={12}>
                  <Typography variant="h4">
                    {t("documents.addDriverDocs")}
                  </Typography>
                </Grid>

                {uploadDocsTypes.map((item, index) => {
                  return (
                    <Grid xs={12} md={6} key={index}>
                      <DocsUploader
                        type={item.title}
                        title={t("documents." + item.title)}
                        company={company_id}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              <Grid xs={12} sx={{ textAlign: "right", px: 2, py: 3 }}>
                <Button>{t("general.addToDraft")}</Button>

                <Button type="submit" color="secondary" variant="contained">
                  {t("general.saveChanges")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid xs="auto">
        <Paper sx={{ p: 2, minWidth:'300px'}}>
          <Stack spacing={2}>
          <Typography variant="h3">Тягач / Причеп</Typography>
          <SelectAsset type='vehicles'/>
          <SelectAsset type='trailers'/>
          {/*<AttachCard itemName="vehicle" onChange={handleAttachCardChange} />
          <AttachCard itemName="trailer" onChange={handleAttachCardChange} />*/}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
    </Grid>
    </>
  );
}

export default AddDriver;
