//global css import
import "slick-carousel/slick/slick.css";

import { ApolloProvider } from "@apollo/react-hooks";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { createEmotionSsrAdvancedApproach } from "tss-react/nextJs";

import { useApollo } from "../lib/apollo-client";
import store, { INIT_THEME } from "../lib/store";
import themes, { useThemeDetector } from "../lib/themes";

const { EmotionCacheProvider, withEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: "css" });
export { withEmotionCache };

const App = (props) => {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    store.dispatch(INIT_THEME());
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Andrew Newstead</title>
      </Head>
      <EmotionCacheProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes["light"]}>
            <CssBaseline />
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </EmotionCacheProvider>
    </Provider>
  );
};

export default App;
