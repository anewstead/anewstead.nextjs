import { DEFAULT_THEME } from "../../theme/theme";
import type { IThemeName } from "../../theme/theme.style";

type IThemeState = {
  themeName: IThemeName;
};

export const initialState: IThemeState = {
  themeName: DEFAULT_THEME,
};
