//global css import
import "slick-carousel/slick/slick.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { StyledEngineProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { createEmotionSsrAdvancedApproach } from "tss-react/nextJs";

import ThemeWrapper from "../containers/theme-wrapper";
import { useApollo } from "../lib/apollo";
import store, { INIT_THEME } from "../lib/store";

const { EmotionCacheProvider, withEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: "css" });

export { withEmotionCache };

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    store.dispatch(INIT_THEME());
  }, []);

  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <Head>
          <title>Andrew Newstead</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <EmotionCacheProvider>
            <StyledEngineProvider injectFirst>
              <ThemeWrapper>
                <Component {...pageProps} />
              </ThemeWrapper>
            </StyledEngineProvider>
          </EmotionCacheProvider>
        </ApolloProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default App;
