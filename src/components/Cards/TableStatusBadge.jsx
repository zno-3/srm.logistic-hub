import { Box, useTheme } from "@mui/material";

function TableStatusBadge(props) {
  const theme = useTheme();
  const color = theme.palette[props.color]["main"];
  return (
    <Box
      sx={{
        backgroundColor: color,
        height: "32px",
        borderRadius: "3px",
        width: "5px",
        my: "-5px",
      }}
    ></Box>
  );
}
export default TableStatusBadge;
