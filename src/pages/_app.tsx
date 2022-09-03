// global css import
import "slick-carousel/slick/slick.css";

import Head from "next/head";
import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { StyledEngineProvider } from "@mui/material";
import { createEmotionSsrAdvancedApproach } from "tss-react/nextJs";

import ThemeWrapper from "../containers/theme-wrapper";
import store, { INIT_THEME } from "../lib/store";
import { useApollo } from "../lib/apollo";

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
