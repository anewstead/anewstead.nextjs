import React, { useEffect } from 'react';
import { Box, CssBaseline, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Footer from '../components/footer/footer';
import HeaderNav from './header-nav';
import themes from '../lib/themes';

const useStyles = makeStyles((theme) => {
  return {
    layoutRoot: {
      minHeight: '100vh',
      /* mobile viewport bug fix */
      minHeight: '-webkit-fill-available',
      minWidth: '320px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flexGrow: 1,
      display: 'flex',
    },
  };
});

const PageLayout = (props) => {
  const { projectData = {}, headerNavType = 'main', children } = props;

  const classes = useStyles();

  const theme = useSelector((state) => {
    return state.app.theme;
  });

  const navBrand = useSelector((state) => {
    return state.app.nav.brand;
  });

  //https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Box className={classes.layoutRoot}>
        <HeaderNav projectData={projectData} navType={headerNavType} />
        <main className={classes.main}>
          {/* DISPLAY */}
          {children}
        </main>
        <Footer brand={navBrand} />
      </Box>
    </ThemeProvider>
  );
};

export default PageLayout;
