import { createTheme } from "@mui/material/styles";

const colors = { primary: "#0E1C36", bgInput: "#F0F0F0" };

const theme = createTheme({
  typography: {
    fontFamily: 'Manrope, Arial, sans-serif',
    h1: { color: colors.primary, fontSize: "2rem", fontWeight: 600},
    h2: { fontSize: "1.5rem", fontWeight: 600},
    h3: { fontSize: "1.3rem", fontWeight: 600 },
    h4: { fontSize: "1.2rem", fontWeight: 600 },
    h5: { fontSize: "1.1rem" },
    h6: { fontSize: "1rem", fontWeight: 600 },
    body: {  fontWeight: 600 },
    body2: { fontSize: "0.75rem"},
    caption: {
      fontSize: "0.6rem",
    },
  },

  palette: {
    primary: {
      main: colors.primary,
      contrastText: "#ffffff",
      light: "#152A51",
      dark: "#051026",
    },
    secondary: {
      main: "#F7DD72",
      contrastText: "#1F2041", // Колір тексту success
      light: "#152A51",
      dark: "#F5D451",
    },

    button: {
      main: "#F7DD72",
      contrastText: '#555', 
      dark: "#c9b45b",
    },

    background: {
      main: "#F6F7F8",
      default: "#F6F7F8",
    },
    grey: {
      main: "#706F6F",
      dark: "#0E951B",
    },
    success: {
      main: "#0E951B", //  success
      contrastText: "#1F2041", // Колір тексту success
      dark: "#67d372",
    },    
    lightgreen: {
      main: "#F3F9F3", // Задній фон success
      contrastText: "#0E951B", // Колір тексту success
    },
    lightblue: {
      main: "#D9EAF6", // Задній фон success
      contrastText: "#0075C4", // Колір тексту success
    },
    white: {
      main: "#ffffff",
      contrastText: "#011627", // Колір тексту success
      dark: "#e9e9e9",
    },
  },

  components: {

    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: '3rem', // Приклад розміру
          '& svg': {
            fill: 'red',  // Приклад коліру іконки
          },
        },
        text: {
          color: 'red',   // Приклад кольору тексту
        },
        icon: {
          color: 'red'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "8px 0 8px 0",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        deleteIcon: {
          opacity: "70%",

          fontSize: "20px", // Змінюємо розмір deleteIcon
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.primary,
          color: "white",
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: "2 10px",
          fontWeight: 600,
          fontSize: "16px",
          boxShadow: "none",
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {},
      },
      defaultProps: {},
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.primary,
          fontWeight: 400,
          fontSize: "0.875rem",
        },
        sizeSmall: {
          lineHeight: "1em",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        sizeSmall: {
          input: {
            padding: "5px 10px",
          },
          inputLabel: {
            lineHeight: "5em",
            color: "red",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          background: colors.bgInput,
          borderRadius: "4px",
          width: "100%",
          input: {
            height: "10px",
            "&::placeholder": {
              fontSize: "12px",
              lineHeight: "1em",
            },
          },
          fieldset: {
            display: "none",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: "off",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          fieldset: {
            display: "none",
          },
          "& .MuiOutlinedInput-input": {
            background: colors.bgInput,
            height: "10px",
            borderRadius: "4px",
            "&::placeholder": {
              fontSize: "14px",
              color: "#637074",
              opacity: 1,
            },
          },
          "& .MuiFilledInput-root": {
            backgroundColor: colors.bgInput,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides:{
        root:{
          background: colors.bgInput,
        }
      }

    },

    MuiSelect: {
      styleOverrides: {
        root: {
          fieldset: {
            display: "none",
          },
          "&.MuiOutlinedInput-root": {
            background: colors.bgInput,
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          color: "white",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#0B7A75",
          textDecoration: 'none'
        }

          

      },
    }
  },
});

export default theme;
