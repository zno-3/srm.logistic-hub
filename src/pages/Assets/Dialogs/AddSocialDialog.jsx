import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ReactComponent as TelegramIcon } from "../../../assets/icons/telegram.svg";
import { ReactComponent as ViberIcon } from "../../../assets/icons/viber.svg";
import { ReactComponent as WhatsappIcon } from "../../../assets/icons/whatsapp.svg";
import { Typography,Checkbox } from "@mui/material";
import { useState } from "react";

function AddSocialDialog({ numbers }) {
  const activeIcon = { height: "40px", width: "40px" };
  const nonactiveIcon = { height: "35px", width: "35px", opacity: 0.4 };

  const hendleSocialChange = (event, phone) => {
    console.log(event);
    console.log(phone);
  };

  const [telegram, setTelegram] = useState([]);
  const [viber, setViber] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);

  return (
    <>
      {numbers.map((it, index) => {
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
                  icon={<TelegramIcon sx={nonactiveIcon} />}
                  checkedIcon={<TelegramIcon sx={activeIcon} />}
                />
                <Checkbox
                  checked={viber.includes(it) ? true : false}
                  name="viber"
                  onChange={(event) => hendleSocialChange(event, it)}
                  icon={<ViberIcon sx={nonactiveIcon} />}
                  checkedIcon={<ViberIcon sx={activeIcon} />}
                />

                <Checkbox
                  checked={whatsapp.includes(it) ? true : false}
                  onChange={(event) => hendleSocialChange(event, it)}
                  name="whatsapp"
                  icon={<WhatsappIcon sx={nonactiveIcon} />}
                  checkedIcon={<WhatsappIcon sx={activeIcon} />}
                />
              </Grid>
            </Grid>
          );
        }
      })}
    </>
  );
}

export default AddSocialDialog;
