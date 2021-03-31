//global css import
import 'slick-carousel/slick/slick.css';

import Head from 'next/head';
import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';

import store, { INIT_THEME } from '../lib/store';
import { useApollo } from '../lib/apollo-client';

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
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
