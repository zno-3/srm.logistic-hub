import { createTheme } from "@mui/material/styles";

const colors = { primary: "#0E1C36" };

const theme = createTheme({
  typography: {
    fontWeight: 600,
    //fontFamily: "Raleway, sans-serif",
    h1: { fontSize: "1.5rem" },
    h2: { fontSize: "1.3rem" },
    h3: { fontSize: "1.1rem", fontWeight: 600 },
    h4: { fontSize: "1rem", fontWeight: 600 },
    h5: { fontSize: "0.9rem" },
    h6: { fontSize: "0.7rem", fontWeight: 600 },
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
      dark: "#d4bd5f",
    },

    button: {
      main: "#F7DD72",
      contrastText: colors.primary, // Колір тексту success
      dark: "#c9b45b",
    },

    background: {
      main: "#F6F7F8",
      default: "#F6F7F8",
    },
    grey: {
      main: "#706F6F",
    },
    green: {
      main: "#6BF178", // Задній фон success
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: '3rem', // Приклад розміру
          //color: 'green',     // Приклад кольору
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
          margin: "0 4px",
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
          background: "#f2f2f7",
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
            background: "#F2F2F7",
            height: "10px",
            borderRadius: "4px",
            "&::placeholder": {
              fontSize: "12px",
              color: "#0E1C36",
              opacity: 1,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fieldset: {
            display: "none",
          },
          "&.MuiOutlinedInput-root": {
            background: "#F2F2F7",
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
  },
});

export default theme;
