import { Switch } from "@mui/material";

function SSwitch ({name, onChange}) {
  const swithStyles = {
    width: 80,
    height: 24,
    fontSize: "0.9em",
    padding: 0,
    textAlign: "center",

    "& .MuiSwitch-switchBase": {
      margin: 0,
      padding: 0,
      transform: "translateX(40px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(0px)",
        "& .MuiSwitch-thumb:before": {
          content: "'km'",
        },
        "& + .MuiSwitch-track": {
          borderRadius: "4px",
          opacity: 1,
          backgroundColor: "#F2F2F7",
          '&:after': {
            content: "'mile'",
            width: "40px",
            position: 'absolute',
          },

        },
    },},
        "& .MuiSwitch-thumb": {
          backgroundColor: "#001e3c",
          width: 40,
          height: 24,
          borderRadius: "4px",
          "&:before": {
            borderRadius: "4px",
            content: "'mile'",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          },
        },

        "& .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#F2F2F7",
          borderRadius: "4px",
          '&:before': {
            content: "'km'",
            position: 'absolute',
            width: 40,
            left: 0
          }
        },
  };



  return <Switch name = {name} onChange={onChange}  sx={{...swithStyles }} />;
}

export default SSwitch;
