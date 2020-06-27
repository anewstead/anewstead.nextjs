//global css import
import 'slick-carousel/slick/slick.css';

import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store, { INIT_THEME } from '../lib/store';

const App = (props) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    store.dispatch(INIT_THEME());
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>Andrew Newstead</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
