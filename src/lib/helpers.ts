import { ICheckbox, IMainData } from "./types";

export const thumbHelper = (
  mainData: IMainData[],
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

  return mainData
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
