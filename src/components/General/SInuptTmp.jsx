import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Chip,
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
//import MuiPhoneNumber from "material-ui-phone-number";

import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const carLicCategories = [
  { label: "A1" },
  { label: "A2" },
  { label: "A" },
  { label: "B" },
  { label: "BE" },
  { label: "C1" },
  { label: "C1E" },
  { label: "C" },
  { label: "CE" },
  { label: "D1" },
  { label: "D1E" },
  { label: "D" },
  { label: "DE" },
  { label: "M" },
  { label: "T" },
];

const languagesOptions = [
  { label: "Англійська" },
  { label: "Українська" },
  { label: "Польська" },
  { label: "Німецька" },
  { label: "Китайська" },
  { label: "Французька" },
];

export const SInuptTmp = ({
  label,
  marginBottom,
  type,
  notNecessarily,
  setLicenses,
  licenses,
  languages,
  setLanguages,
  onChange,
  value,
  name,
  addPhone,
  labeloff,
}) => {
  const { t } = useTranslation();

  const addChip = (setState, value, state) => {
    if (!state.find((it) => it === value)) {
      setState([...state, value]);
    }
  };

  const deleteChip = (value, setState, state) => {
    setState(state.filter((it) => it !== value));
  };

  const handleChangeNumber = (event) => {
    const inputValue = event.target.value;
    if (
      /^\d+(\.\d{0,2})?$/.test(inputValue) &&
      parseFloat(inputValue) <= 1000
    ) {
      value = inputValue;
      onChange(inputValue);
    }
  };

  ////////////////////
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(true);
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };
  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };



  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>
        <Grid xs>
          {!labeloff && <Typography variant="body2">{label}</Typography>}
        </Grid>
        <Grid>
          {notNecessarily && (
            <Typography variant="caption">Не обов’язково</Typography>
          )}
        </Grid>
      </Grid>

      {/* Додавання дати народження */}

      {type === "selectBirsday" ? (
        <BirdhayInput
          actionBar={"Введіть дату або виберіть"}
          name={name}
          onChange={onChange}
          value={value}
        />
      ) : type === "addCarLicense" ? (
        // Додавання категорій прав

        <>
          <Autocomplete
            options={carLicCategories}
            placeholder="Додати"
            onInputChange={(e, value) => {
              value.length > 0 && addChip(setLicenses, value, licenses);
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Додати" />
            )}
          />
          {licenses.length > 0 && (
            <>
              <Typography variant="caption">Додані категорії прав</Typography>
              <ChipList>
                {licenses?.map((it, index) => {
                  return (
                    <Chip
                      label={it}
                      size="small"
                      color="lightblue"
                      onDelete={() => deleteChip(it, setLanguages, languages)}
                    />
                  );
                })}
              </ChipList>
            </>
          )}
        </>
      ) : type === "languages" ? (
        // Додавання мов
        <>
          <AddCarLicense
            options={languagesOptions}
            placeholder="Додати"
            onInputChange={(e, value) =>
              value.length > 0 && addChip(setLanguages, value, languages)
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Додати" />
            )}
          />
          {languages.length > 0 && (
            <>
              <TextInfo>Додані іноземні мови</TextInfo>
              <ChipList>
                {languages.map((it, index) => {
                  return (
                    <Chip
                      label={it}
                      size="small"
                      color="lightgreen"
                      onDelete={() => deleteChip(it, setLanguages, languages)}
                    />
                  );
                })}
              </ChipList>
            </>
          )}
        </>
      ) : type === "selectExp" ? (
        // Додавання стажу
        <>
          <Grid container>
            <Grid xs>
              <Typography variant="caption" gutterBottom>
                {value === -1 ? "Не вказано" : ""}
              </Typography>
            </Grid>
            <Grid xs="auto">
              <Typography variant="caption" gutterBottom>
                70 років
              </Typography>
            </Grid>
          </Grid>
          <Slider
            color="primary"
            onChange={onChange}
            value={value}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => (value === -1 ? "" : value)}
            min={-1}
            max={70}
            sx={{
              "& .MuiSlider-valueLabelOpen": {
                top: 55,
                fontWeight: "500",
                fontSize: "1.05rem",
                backgroundColor: "unset",
                color: "#0E1C36",
                "::before": {
                  display: "none",
                },
              },
            }}
          />
        </>
      ) : type === "phone" ? (
        <>
            <PhoneInput
      country={'us'}
      //value={phone}
      //onChange={phone => setPhone(phone)}
    />
          //TelInput
          //  placeholder="Ввести"
          //  defaultCountry="ua"
          //  variant="outlined"
          //  autoComplete="off"
          //  value={value}
          //  onChange={onChange}
          //  name={name}
          //
          ///
        </>
      ) : type === "number" ? (
        <Input
          onChange={handleChangeNumber}
          value={value}
          fullWidth
          autoComplete="off"
          placeholder="Ввести"
          type="number"
          name={name}
        />
      )  : (
        <Input
          onChange={onChange}
          value={value}
          autoComplete="off"
          placeholder="Ввести"
          type="text"
          name={name}
        />
      )}
    </Box>
  );
};

const TextInfo = styled("h4")`
  color: #706f6f;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  margin: 12px 0;
`;



const Input = styled("TextField")`
  width: 100%;

  .MuiOutlinedInput-root {
    border: none;
  }

  .MuiOutlinedInput-input {
    width: 100%;
    border-radius: 4px;
    background: #f2f2f7;
    border: none;
    height: 10px;

    &::placeholder {
      font-size: 12px;
    }
  }

  fieldset {
    display: none;
  }
`;

//const TelInput = styledMui(MuiPhoneNumber)({
//  width: "100%",
//  background: "#f2f2f7",
//  borderRadius: 4,
//  height: 43,
//  fieldset: {
//    border: 0,
//  },
//  input: {
//    padding: "10px 5px",
//  },
//});

const BirdhayInput  = styled(DatePicker)({
  backgroundColor: '#f2f2f7',
  borderRadius: '4px',
  width: '100%',
  '& .MuiInputBase-root': {
    height: '40px', // Можливо, вам потрібно буде налаштувати цю висоту
  },
  '& .MuiInputBase-input': {
    height: '10px',
    '&::placeholder': {
      fontSize: '12px',
      fontFamily: 'Fixel-Regular',
    },
  },
  '& fieldset': {
    display: 'none',
  },
});

const AddCarLicense  = styled(Autocomplete)(({ theme }) => ({
  backgroundColor: '#f2f2f7',
  borderRadius: '4px',
  width: '100%',
  '& .MuiInputBase-root': {
    height: '40px', // Adjust height as needed
  },
  '& .MuiInputBase-input': {
    height: '10px',
    '&::placeholder': {
      fontSize: '12px',
      lineHeight: '1em',
    },
  },
  '& fieldset': {
    display: 'none',
  },
}));

const ChipList = styled("div")({
  display: "flex",
  gap: "4px",
  flexWrap: "wrap"
});
