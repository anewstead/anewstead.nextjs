import { deepmerge } from "@mui/utils";

import {
  DARK,
  LIGHT,
  darkTheme,
  globalOverrides,
  lightTheme,
} from "./theme.style";

export const DEFAULT_THEME = LIGHT;

export type IThemeName = typeof DARK | typeof LIGHT;

const light = deepmerge(lightTheme, globalOverrides(lightTheme));
const dark = deepmerge(darkTheme, globalOverrides(darkTheme));
const themes = { light, dark };

const storeThemeName = (themeName: IThemeName) => {
  localStorage.setItem("theme", themeName);
};

const retreiveThemeName = (): IThemeName | null => {
  return localStorage.getItem("theme") as IThemeName;
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
