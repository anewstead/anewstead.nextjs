import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";

type NCCPayload = {
  checkbox: { id: string; checked: boolean };
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    NAV_CHECKBOX_CHANGE: (state, action: PayloadAction<NCCPayload>) => {
      const { id, checked } = action.payload.checkbox;
      const stateCheckbox = state.nav.checkboxes.find((cb) => {
        return cb.id === id;
      });
      if (!stateCheckbox) {
        throw new Error(`state does not contain checkbox with id: ${id}`);
      } else {
        stateCheckbox.checked = checked; // creates 2 way bind
      }
    },
  },
});

export const { NAV_CHECKBOX_CHANGE } = slice.actions;

export const homeReducer = slice.reducer;
