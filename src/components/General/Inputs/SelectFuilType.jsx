import { useState } from "react";
import { MenuItem, Select, InputLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const fuilTypes = [
  { id: 1, title: "diesel" },
  { id: 2, title: "А92" },
  { id: 3, title: "А95" },
  { id: 4, title: "А98" },
  { id: 5, title: "gas" },
];

function SelectFuilType({ name, onChange }) {
  const [value, setValue] = useState("");

  const hendleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <>
      <InputLabel>Тип пального</InputLabel>
      <Select
        displayEmpty
        fullWidth
        name={name}
        value={value}
        placeholder="rrr"
        variant="outlined"
        size="small"
        onChange={hendleChange}
      >
        <MenuItem value="">
          <Typography sx={{ fontSize: "12px" }}>Оберіть тип</Typography>
        </MenuItem>
        {fuilTypes.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export default SelectFuilType;
