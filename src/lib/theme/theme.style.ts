import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";

export const DARK = "dark";
export const LIGHT = "light";

export const globalOverrides = (theme: Theme) => {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            height: "100%",
            fontSize: 16,
            [theme.breakpoints.up("sm")]: {
              fontSize: 18,
            },
          },
          body: {
            height: "100%",
          },
          "#__next": {
            height: "100%",
          },
          img: {
            display: "block",
          },
          a: {
            color: "inherit",
          },
        },
      },
    },
  };
};

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: LIGHT,
      background: {
        paper: blueGrey[50],
        default: grey[300],
      },
    },
  }),
  { breakpoints: ["xs", "sm"] }
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: DARK,
      background: {
        paper: blueGrey[800],
        default: grey[800],
      },
    },
  }),
  { breakpoints: ["xs", "sm"], factor: 2 }
);
