import { DEFAULT_THEME } from "../../theme/theme";

type IThemeState = {
  themeName: string;
};

export const initialState: IThemeState = {
  themeName: DEFAULT_THEME,
};
