import { DEFAULT_THEME } from "../../../wrappers/theme-wrapper/helpers";
import type { IThemeName } from "../../../wrappers/theme-wrapper/theme.style";

type IThemeState = {
  themeName: IThemeName;
};

export const initialState: IThemeState = {
  themeName: DEFAULT_THEME,
};
