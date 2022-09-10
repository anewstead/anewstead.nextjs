import type { IProjectType } from "./mainDataState";

export type IProjectLabel = "Websites" | "Apps" | "Adverts";

export type ICheckbox = {
  id: IProjectType;
  label: IProjectLabel;
  checked: boolean;
};

type IHomePageState = {
  nav: {
    checkboxes: ICheckbox[];
  };
};

export const initialState: IHomePageState = {
  nav: {
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
