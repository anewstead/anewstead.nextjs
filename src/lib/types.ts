import store from "./store";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export type IProjectType = "site" | "app" | "banner";
export type IProjectLabel = "Websites" | "Apps" | "Adverts";
export type IProjectTech = "flash" | "html";
export type IProjectView = "gallery" | "video" | "iframe";

export type IThumb = {
  id: number;
  type: IProjectType;
  thumb: string;
  client: string;
  brand: string;
  project: string;
};

export type ICheckbox = {
  id: IProjectType;
  label: IProjectLabel;
  checked: boolean;
};

export type IMainData = {
  id: number;
  client: string;
  brand: string;
  project: string;
  type: IProjectType;
  tech: IProjectTech;
  thumb: string;
  view: {
    type: IProjectView;
    width: number;
    height: number;
    href: string;
    poster: string;
    still: string;
    stills: string[];
  };
  info: string;
};

export type IState = {
  baseContentURL: string;
  displayThumbs: IThumb[];
  themeName: string;
  nav: {
    brand: string;
    checkboxes: ICheckbox[];
  };
};
