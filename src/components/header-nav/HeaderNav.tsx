import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import HeaderNavDetail from "./HeaderNavDetail";
import HeaderNavThumbs from "./HeaderNavThumbs";
import { BRAND } from "../../core/const";
import type { ICheckbox } from "../../core/state/home/state";
import { NAV_CHECKBOX_CHANGE } from "../../core/state/home/slice";
import type { RootState } from "../../core/state/store";
import { TOGGLE_THEME } from "../../core/state/theme/slice";
import { useAppSelector } from "../../core/state/store";

type Props = {
  navType: "thumbs" | "detail";
  titleText?: string;
  subtitleText?: string;
};

const HeaderNav = (props: Props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const navCheckboxes = useAppSelector((state: RootState) => {
    return state.home.nav.checkboxes;
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
    const { id, checked } = e.currentTarget;
    const payload = {
      checkbox: { id, checked },
    };
    dispatch(NAV_CHECKBOX_CHANGE(payload));
  };

  let nav;
  switch (navType) {
    case "thumbs":
      nav = (
        <HeaderNavThumbs
          brandName={BRAND}
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
