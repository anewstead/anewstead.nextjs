import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Footer from '../components/footer/footer';
import HeaderNavDetail from '../components/header-nav-detail/header-nav-detail';
import HeaderNavMain from '../components/header-nav-main/header-nav-main';
import PageWrapper from './page-wrapper';
import { NAV_CHECKBOX_CHANGE, TOGGLE_THEME } from '../lib/store';

const useStyles = makeStyles((theme) => {
  return {
    main: {
      flexGrow: 1,
      display: 'flex',
    },
    mainAndFooterWrapper: {
      overflow: 'auto',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const PageLayout = (props) => {
  const { data = {}, headerNav, children } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const navBrand = useSelector((state) => {
    return state.app.nav.brand;
  });

  const navCheckboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  const titleText = data.client || '';
  const subtitleText = `${data.brand} - ${data.project}` || '';

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
  switch (headerNav) {
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

  return (
    <PageWrapper data={data}>
      {/* NAV */}
      {nav}
      <div className={classes.mainAndFooterWrapper}>
        <main className={classes.main}>
          {/* DISPLAY */}
          {children}
        </main>
        <Footer brand={navBrand} />
      </div>
    </PageWrapper>
  );
};

export default PageLayout;
