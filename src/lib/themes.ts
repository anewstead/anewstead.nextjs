import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";
import { deepmerge } from "@mui/utils";

const DARK = "dark";
const LIGHT = "light";
export const DEFAULT_THEME = LIGHT;

type IThemeName = typeof DARK | typeof LIGHT;

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

const lightTheme = responsiveFontSizes(
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

const darkTheme = responsiveFontSizes(
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

type IThemes = Record<string, Theme> & {
  light: Theme;
  dark: Theme;
};

const light = deepmerge(lightTheme, globalOverrides(lightTheme));
const dark = deepmerge(darkTheme, globalOverrides(darkTheme));

const themes: IThemes = { light, dark };

const storeThemeName = (themeName: IThemeName) => {
  localStorage.setItem("theme", themeName);
};

const retreiveThemeName = (): IThemeName | null => {
  return localStorage.getItem("theme") as IThemeName;
};

export const initThemeName = (): string => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME; // SSR
  }
  let themeName: IThemeName = DEFAULT_THEME;
  const lsTheme = retreiveThemeName();
  if (lsTheme) {
    themeName = lsTheme; // returning user
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeName = DARK; // firsttime user system pref is dark
  }
  storeThemeName(themeName);
  return themeName;
};

export const toggleThemeName = (): IThemeName => {
  const lsTheme = retreiveThemeName();
  const themeName = lsTheme === DARK ? LIGHT : DARK;
  storeThemeName(themeName);
  return themeName;
};

export default themes;
