import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import HeaderNavDetail from '../components/header-nav-detail/header-nav-detail';
import HeaderNavMain from '../components/header-nav-main/header-nav-main';
import { NAV_CHECKBOX_CHANGE, TOGGLE_THEME } from '../lib/store';

const HeaderNav = (props) => {
  const { projectData = {}, navType = 'main' } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const navBrand = useSelector((state) => {
    return state.app.nav.brand;
  });

  const navCheckboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  const titleText = projectData.client;

  let subtitleText = '';
  if (projectData.brand && projectData.project) {
    subtitleText = `${projectData.brand} - ${projectData.project}`;
  } else if (projectData.brand) {
    subtitleText = projectData.brand;
  } else if (projectData.project) {
    subtitleText = projectData.project;
  }

  const backClick = () => {
    router.push('/');
  };

  const brandClick = (e) => {
    e.stopPropagation();
    router.push('/about');
  };

  const themeClick = () => {
    dispatch(TOGGLE_THEME());
  };

  const checkboxChange = (e) => {
    const payload = { id: e.target.id, checked: e.target.checked };
    dispatch(NAV_CHECKBOX_CHANGE(payload));
  };

  let nav;
  switch (navType) {
    case 'main':
      nav = (
        <HeaderNavMain
          brandName={navBrand}
          checkboxData={navCheckboxes}
          onBrandClick={brandClick}
          onThemeClick={themeClick}
          onCheckboxChange={checkboxChange}
        />
      );
      break;

    default:
      nav = (
        <HeaderNavDetail
          brandName={navBrand}
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
