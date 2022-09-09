// import type { ICheckbox } from "../types";
import type { ICheckbox } from "./homeState";
import type { IMainData } from "./mainDataState";

/**
 * filters which thumbs to show depending on which checkboxes are checked
 */
export const thumbHelper = (
  allThumbs: IMainData[],
  checkboxes: ICheckbox[]
): IMainData[] => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === "site";
  })?.checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === "app";
  })?.checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === "banner";
  })?.checked;

  return allThumbs
    .filter((obj) => {
      return (
        (showSites && obj.type === "site") ||
        (showApps && obj.type === "app") ||
        (showAds && obj.type === "banner")
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
};
