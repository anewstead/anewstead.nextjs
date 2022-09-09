/**
 * IMPORTANT
 * there is no store.mainData!
 * previously as a client-side SPA we front loaded JSON to state.
 * now as a nextjs SSR application we load relevent data server-side to render pages
 * the IMainData type remains and is still valid and used throughout
 */
export type IProjectType = "site" | "app" | "banner";
export type IProjectTech = "flash" | "html";
export type IProjectView = "gallery" | "video" | "iframe";

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
