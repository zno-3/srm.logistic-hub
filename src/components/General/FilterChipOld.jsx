import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Chip } from "@mui/material";

const CustomChipWrapper = styled("div")`
  display: flex;
  text-align: left;
`;

const Circle = styled("div")(({ color }) => ({
  minWidth: "22px",
  height: "22px",
  color: "#FFF",
  borderRadius: "10px",
  fontSize: "16px",
  padding: "3px",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  userSelect: "none",
  backgroundColor: color,
}));

const StyledChip = styled(Chip)(() => ({
  //color: active ? '#fff': 'none',
  cursor: "pointer",
  height: "24px",
  "&:hover": {
    "& .MuiChip-icon": {
      //fill: "#FFFFFF !important",
    },
  },
  "& .MuiChip-label": {
    padding: 0,
  },
  margin: "5px",
}));

const FilterChip = ({ label, filter, color, active, count, icon, onClick }) => {
  const iconStyles = {
    height: "18px",
    width: "18px",
    fill: active ? "#FFF" : color,
    margin: "0 8px",
  };

  return (
    <StyledChip
      onClick={() => onClick(filter)}
      sx={{
        border: "1px solid transparent",
        background: active ? color : "transparent", 
        "&:hover": {
          border: "1px solid " + color
        },
      }}
      label={
        <CustomChipWrapper>
          <Circle color={color}>
            <Typography sx={{ userSelect: "none" }} component="span">
              {count}
            </Typography>
          </Circle>
          {React.cloneElement(icon, {
            className: "MuiChip-icon",
            style: iconStyles,
          })}
          <Typography
            component="span"
            sx={{
              color: active ? "#fff" : color,
              lineHeight: "20px",
              marginRight: "8px",
              userSelect: "none",
            }}
          >
            {label}
          </Typography>
        </CustomChipWrapper>
      }
    />
  );
};

export default FilterChip;
