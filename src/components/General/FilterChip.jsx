import React from "react";
import { Typography, Stack,  Box } from "@mui/material";
import { red } from "@mui/material/colors";


const FilterChip = ({ label, filter, color, active, count, icon, onClick }) => {
  
  const iconStyles = {
    height: "18px",
    width: "18px",
    fill: active ? "#FFF" : color,
    margin: "1px 8px",
  };

  return (
    <>
      <Box
        onClick={() => onClick(filter)}
        sx={{
          borderRadius: 2,
          p: 0.75,
          backgroundColor: active ? color : "transparent",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: color,
            opacity: active ? 0.9 : 0.2,
          },
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              backgroundColor: active ? '#ffffff' : color,
              height: 24,
              width: "fit-content",
              minWidth: "24px",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                //fontWeight: 600,
                userSelect: "none",
                textAlign: "center",
                color: active? color : "#ffffff"
              }}
              component="span"
            >
              {count}
            </Typography>
          </Box>

          {React.cloneElement(icon, {
            className: "MuiChip-icon",
            style: iconStyles,
          })}
          <Typography
            variant="h5"
            sx={{ userSelect: "none", color: active ? "#fff" : color }}
            component="span"
          >
            {label}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default FilterChip;
