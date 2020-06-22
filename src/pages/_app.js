import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store, { INIT_DATA } from '../lib/store';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  // console.log('MyApp', props);

  // useEffect(() => {
  //   store.dispatch(INIT_DATA(props.props.data));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

// ===============================================

// MyApp.getInitialProps = async () => {
//   const url =
//     'https://anewstead-content.netlify.app/.netlify/functions/alldata';
//   const res = await fetch(url);
//   const data = await res.json();
//   return { props: { data } };
// };

export default MyApp;
