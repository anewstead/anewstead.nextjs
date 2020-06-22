import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import themes from '../lib/themes';

// import { FETCH_MAIN_DATA } from '../lib/store';

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

const feedback = (content) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: '50vh' }}
    >
      <Grid item>{content}</Grid>
    </Grid>
  );
};

const spinner = feedback(<CircularProgress />);

const failedToLoad = feedback(
  <h3>
    Failed to load site data{' '}
    <span role="img" aria-label="crying emoji">
      😢
    </span>
  </h3>
);

const PageWrapper = (props) => {
  const { data, children } = props;

  const classes = useStyles();
  // const dispatch = useDispatch();

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

  // const baseContentURL = useSelector((state) => {
  //   return state.app.baseContentURL;
  // });

  const mainData = useSelector((state) => {
    return state.app.mainData;
  });

  // useEffect(() => {
  //   const url = `${baseContentURL}.netlify/functions/alldata`;
  //   dispatch(FETCH_MAIN_DATA(url));
  // }, [dispatch, baseContentURL]);

  let display = spinner;
  if (mainData === 'rejected') {
    display = failedToLoad;
  } else if (mainData) {
    display = props.children;
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Box className={classes.root}>
        {/* DISPLAY */}
        {props.children}
      </Box>
    </ThemeProvider>
  );
};

export default PageWrapper;
