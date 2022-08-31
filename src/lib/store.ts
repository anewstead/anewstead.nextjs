import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import initialState from "./initialState";
import { initTheme, toggleTheme } from "./themes";
import type { IAppDispatch, IRootState } from "./types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    INIT_THEME: (state) => {
      state.theme = initTheme();
    },
    TOGGLE_THEME: (state) => {
      state.theme = toggleTheme();
    },
    NAV_CHECKBOX_CHANGE: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (!checkbox) {
        throw new Error(`store: cannot find checkbox: ${action.payload.id}`);
      } else {
        checkbox.checked = action.payload.checked; //2 way bind
      }
    },
  },
});

const store = configureStore({
  reducer: {
    app: slice.reducer,
  },
});

export const { INIT_THEME, TOGGLE_THEME, NAV_CHECKBOX_CHANGE } = slice.actions;

export default store;
