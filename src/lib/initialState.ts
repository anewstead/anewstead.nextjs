import { DEFAULT_THEME } from "./themes";
import type { IState } from "./types";

const initialState: IState = {
  baseContentURL: "https://anewstead-content.netlify.app/",
  displayThumbs: [],
  themeName: DEFAULT_THEME,
  nav: {
    brand: "Andrew Newstead",
    checkboxes: [
      {
        id: "site",
        label: "Websites",
        checked: true,
      },
      {
        id: "app",
        label: "Apps",
        checked: true,
      },
      {
        id: "banner",
        label: "Adverts",
        checked: true,
      },
    ],
  },
};

export default initialState;
