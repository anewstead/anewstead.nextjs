import { blueGrey, grey } from "@mui/material/colors";
import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

// remember preference for next time user visits
const storeColorTheme = (themeName: string) => {
  localStorage.setItem("theme", themeName);
};

// if nextjs SSR return default
// if user has been here before return their pref
// else try detect from browser preference
export const detectColorTheme = (): string => {
  let themeName = "light";
  if (typeof window === "undefined") {
    return themeName;
  }
  const lsTheme = localStorage.getItem("theme");
  if (lsTheme && (lsTheme === "light" || lsTheme === "dark")) {
    return lsTheme;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeName = "dark";
  }
  storeColorTheme(themeName);
  return themeName;
};

export const toggleColorTheme = (): string => {
  const lsTheme = localStorage.getItem("theme");
  const themeName = lsTheme === "dark" ? "light" : "dark";
  storeColorTheme(themeName);
  return themeName;
};

const globalOverrides = (theme: Theme) => {
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

type IThemes = Record<string, Theme> & {
  light: Theme;
  dark: Theme;
};

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      background: {
        paper: blueGrey[50],
        default: grey[300],
      },
    },
  }),
  { breakpoints: ["xs", "sm"] }
);
const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      background: {
        paper: blueGrey[800],
        default: grey[800],
      },
    },
  }),
  { breakpoints: ["xs", "sm"], factor: 2 }
);

const light = deepmerge(lightTheme, globalOverrides(lightTheme));
const dark = deepmerge(darkTheme, globalOverrides(darkTheme));

const themes: IThemes = { light, dark };

export default themes;
