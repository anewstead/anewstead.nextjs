import React, { useEffect } from 'react';
import { Box, CssBaseline, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import themes from '../lib/themes';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: '100vh',
      minWidth: '320px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const PageWrapper = (props) => {
  const { children } = props;

  const classes = useStyles();

  const theme = useSelector((state) => {
    return state.app.theme;
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
      <Box className={classes.root}>
        {/* DISPLAY */}
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default PageWrapper;
