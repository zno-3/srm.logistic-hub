import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Checkbox,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegram.svg";
import { ReactComponent as ViberIcon } from "../../assets/icons/viber.svg";
import { ReactComponent as WhatsappIcon } from "../../assets/icons/whatsapp.svg";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const SocialMediaModal = ({
  phones,
  closeModal,
  telegram,
  setTelegram,
  viber,
  setViber,
  whatsapp,
  setWhatsapp,
}) => {
  const { t } = useTranslation();
  console.log(telegram);
  const addSocialMedia = (it, soc) => {
    if (soc === "viber") {
      if (viber.find((item) => item === it)) {
        setViber(viber.filter((item) => item !== it));
      } else {
        setViber([...viber, it]);
      }
    } else if (soc === "telegram") {
      if (telegram.find((item) => item === it)) {
        setTelegram(telegram.filter((item) => item !== it));
      } else {
        setTelegram([...telegram, it]);
      }
    }
    if (soc === "whatsapp") {
      if (whatsapp.find((item) => item === it)) {
        setWhatsapp(whatsapp.filter((item) => item !== it));
      } else {
        setWhatsapp([...whatsapp, it]);
      }
    }
  };

  const hendleSocialChange = (event, phone) => {
    switch (event.target.name) {
      case "whatsapp":
        if (whatsapp.find((item) => item === phone)) {
          setWhatsapp(whatsapp.filter((item) => item !== phone));
        } else {
          setWhatsapp([...whatsapp, phone]);
        }
        break;
      case "viber":
        if (viber.find((item) => item === phone)) {
          setViber(viber.filter((item) => item !== phone));
        } else {
          setViber([...viber, phone]);
        }
        break;
      case "telegram":
        if (telegram.find((item) => item === phone)) {
          setTelegram(telegram.filter((item) => item !== phone));
        } else {
          setTelegram([...telegram, phone]);
        }
        break;

      default:
        break;
    }
  };

  const activeIcon = { height: "40px", width: "40px" };
  const nonactiveIcon = { height: "35px", width: "35px", opacity: 0.4 };

  return (
    <Dialog open={true}>
      <DialogTitle>Додати соціальні мережі</DialogTitle>
      <DialogContent dividers>
        {phones.map((it, index) => {
          if (it) {
            return (
              <Grid container key={index}>
                <Grid>
                  <Typography variant="h6">{it}</Typography>
                </Grid>
                <Grid>
                  <Checkbox
                    checked={telegram.includes(it) ? true : false}
                    name="telegram"
                    onChange={(event) => hendleSocialChange(event, it)}
                    icon={<TelegramIcon style={nonactiveIcon} />}
                    checkedIcon={<TelegramIcon style={activeIcon} />}
                  />
                  <Checkbox
                    checked={viber.includes(it) ? true : false}
                    name="viber"
                    onChange={(event) => hendleSocialChange(event, it)}
                    icon={<ViberIcon style={nonactiveIcon} />}
                    checkedIcon={<ViberIcon style={activeIcon} />}
                  />

                  <Checkbox
                    checked={whatsapp.includes(it) ? true : false}
                    onChange={(event) => hendleSocialChange(event, it)}
                    name="whatsapp"
                    icon={<WhatsappIcon style={nonactiveIcon} />}
                    checkedIcon={<WhatsappIcon style={activeIcon} />}
                  />
                </Grid>
              </Grid>
            );
          }
        })}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="button"
          variant="contained"
          onClick={closeModal}
        >
          {t("general.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
