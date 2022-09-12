import { createSlice } from "@reduxjs/toolkit";

import { initThemeName, toggleThemeName } from "../../theme/theme";
import { initialState } from "./state";

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    INIT_THEME: (state) => {
      state.themeName = initThemeName();
    },
    TOGGLE_THEME: (state) => {
      state.themeName = toggleThemeName();
    },
  },
});

export const { INIT_THEME, TOGGLE_THEME } = slice.actions;

export default slice.reducer;
