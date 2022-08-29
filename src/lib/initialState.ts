import { detectColorTheme } from "./themes";
import { IState } from "./types";

const initialState: IState = {
  baseContentURL: "https://anewstead-content.netlify.app/",
  displayThumbs: [],
  theme: detectColorTheme(),
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
