import type { Theme } from "@mui/material";
import { deepmerge } from "@mui/utils";

import type { IThemeName } from "./theme.style";
import { darkTheme, globalOverrides, lightTheme } from "./theme.style";

export const DEFAULT_THEME: IThemeName = "light";

const LS_KEY_THEME = "theme";

const storeThemeName = (themeName: IThemeName) => {
  localStorage.setItem(LS_KEY_THEME, themeName);
};

const retreiveThemeName = (): IThemeName | null => {
  return localStorage.getItem(LS_KEY_THEME) as IThemeName;
};

export const initThemeName = (): IThemeName => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME; // SSR
  }
  const lsTheme = retreiveThemeName();
  if (lsTheme) {
    return lsTheme; // returning user
  }
  let themeName: IThemeName = DEFAULT_THEME;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeName = "dark"; // firsttime user system pref is dark
  }
  storeThemeName(themeName);
  return themeName;
};

export const toggleThemeName = (): IThemeName => {
  const lsTheme = retreiveThemeName();
  const themeName: IThemeName = lsTheme === "light" ? "dark" : "light";
  storeThemeName(themeName);
  return themeName;
};

// ----------

// these variable must == IThemeName == the const string used as theme mode
const light = deepmerge(lightTheme, globalOverrides(lightTheme));
const dark = deepmerge(darkTheme, globalOverrides(darkTheme));

type IThemes = Record<IThemeName, Theme> & {
  light: Theme;
  dark: Theme;
};

const themes: IThemes = { light, dark };
export default themes;
