import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

import {
  NAV_CHECKBOX_CHANGE,
  TOGGLE_THEME,
  useAppSelector,
} from "../../lib/store";
import { ICheckbox, IRootState } from "../../lib/types";
import HeaderNavDetail from "./HeaderNavDetail";
import HeaderNavThumbs from "./HeaderNavThumbs";

type Props = {
  navType: "thumbs" | "detail";
  titleText?: string;
  subtitleText?: string;
};

const HeaderNav = (props: Props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const navBrand = useAppSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  const navCheckboxes = useAppSelector((state: IRootState) => {
    return state.app.nav.checkboxes;
  });

  const backClick = () => {
    router.push("/");
  };

  const brandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/about");
  };

  const themeClick = () => {
    dispatch(TOGGLE_THEME());
  };

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = {
      id: e.currentTarget.id,
      checked: e.currentTarget.checked,
    };
    dispatch(NAV_CHECKBOX_CHANGE(payload));
  };

  let nav;
  switch (navType) {
    case "thumbs":
      nav = (
        <HeaderNavThumbs
          brandName={navBrand}
          checkboxData={navCheckboxes as ICheckbox[]}
          onBrandClick={brandClick}
          onThemeClick={themeClick}
          onCheckboxChange={checkboxChange}
        />
      );
      break;

    default:
      nav = (
        <HeaderNavDetail
          onBackClick={backClick}
          onThemeClick={themeClick}
          titleText={titleText}
          subtitleText={subtitleText}
        />
      );
      break;
  }

  return nav;
};

export default HeaderNav;
