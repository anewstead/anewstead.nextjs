import { configureStore, createSlice } from '@reduxjs/toolkit';

import { detectColorTheme, toggleColorTheme } from './themes';

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: 'app',
  initialState: {
    baseContentURL: 'https://anewstead-content.netlify.app',
    theme: 'light',
    nav: {
      brand: 'Andrew Newstead',
      checkboxes: [
        {
          id: 'site',
          label: 'Websites',
          checked: true,
        },
        {
          id: 'app',
          label: 'Apps',
          checked: true,
        },
        {
          id: 'banner',
          label: 'Adverts',
          checked: true,
        },
      ],
    },
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    INIT_THEME: (state, action) => {
      state.theme = detectColorTheme();
    },
    TOGGLE_THEME: (state, action) => {
      state.theme = toggleColorTheme();
    },
    NAV_CHECKBOX_CHANGE: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      checkbox.checked = action.payload.checked;
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
