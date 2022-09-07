/* eslint-disable no-param-reassign */
/**
 * Redux Toolkit allows "mutating" logic for state in reducers via Immer library.
 * so we allow eslint param-reassign
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import initialState from "./initialState";
import type { IAppDispatch, IRootState } from "./types";
import { initThemeName, toggleThemeName } from "../theme/theme";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    INIT_THEME: (state) => {
      state.themeName = initThemeName();
    },
    TOGGLE_THEME: (state) => {
      state.themeName = toggleThemeName();
    },
    NAV_CHECKBOX_CHANGE: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (!checkbox) {
        throw new Error(`store: cannot find checkbox: ${action.payload.id}`);
      } else {
        checkbox.checked = action.payload.checked; // 2 way bind
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
