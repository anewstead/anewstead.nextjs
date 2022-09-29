// global css import
import "slick-carousel/slick/slick.css";

import Head from "next/head";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { createEmotionSsrAdvancedApproach } from "tss-react/nextJs";

import ThemeWrapper from "../containers/theme-wrapper";
import store from "../app/state/store";
import type { InitialState } from "../app/service/apollo";
import { useApollo } from "../app/service/apollo";

const { EmotionCacheProvider, withEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: "css" });

type AppPropsExtended = {
  initialApolloState: InitialState;
};

export { withEmotionCache };

const App = (props: AppProps<AppPropsExtended>) => {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <Head>
          <title>Andrew Newstead</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <EmotionCacheProvider>
            <ThemeWrapper>
              <Component {...pageProps} />
            </ThemeWrapper>
          </EmotionCacheProvider>
        </ApolloProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default App;
