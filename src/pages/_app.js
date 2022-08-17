//global css import
import 'slick-carousel/slick/slick.css';

import Head from 'next/head';
import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { CacheProvider } from '@emotion/react';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import createEmotionCache from '../lib/createEmotionCache';
import store, { INIT_THEME } from '../lib/store';
import themes, { useThemeDetector } from '../lib/themes';
import { useApollo } from '../lib/apollo-client';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  // const theme = useSelector((state) => {
  //   return state.app.theme;
  // });

  // const isDarkTheme = useThemeDetector();
  // const initTheme = isDarkTheme ? 'dark' : 'light';

  useEffect(() => {
    store.dispatch(INIT_THEME());
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Andrew Newstead</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes['light']}>
            <CssBaseline />
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
