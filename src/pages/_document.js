// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

// import theme from '../src/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Andrew Newstead" />
          <meta name="description" content="Andrew Newstead" />
          <meta name="author" content="Andrew Newstead" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />

          {/* <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' /> */}

          {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
          {/* <meta name="apple-mobile-web-app-status-bar-style" content="default" /> */}
          {/* <meta name="apple-mobile-web-app-title" content="Andrew Newstead" /> */}

          {/* <meta name='msapplication-config' content='/static/icons/browserconfig.xml' /> */}
          {/* <meta name="msapplication-TileColor" content="#2B5797" /> */}
          {/* <meta name="msapplication-tap-highlight" content="no" /> */}

          {/* <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://yourdomain.com' />
          <meta name='twitter:title' content='PWA App' />
          <meta name='twitter:description' content='Best PWA App in the world' />
          <meta name='twitter:image' content='https://yourdomain.com/static/icons/android-chrome-192x192.png' />
          <meta name='twitter:creator' content='@DavidWShadow' /> */}

          {/* <meta property='og:type' content='website' />
          <meta property='og:title' content='PWA App' />
          <meta property='og:description' content='Best PWA App in the world' />
          <meta property='og:site_name' content='PWA App' />
          <meta property='og:url' content='https://yourdomain.com' />
          <meta property='og:image' content='https://yourdomain.com/static/icons/apple-touch-icon.png' /> */}

          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          <link rel="preconnect" href="//anewstead-content.netlify.app" />
          <link rel="preconnect" href="//drive.google.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App) => {
        return (props) => {
          return sheets.collect(<App {...props} />);
        };
      },
    });
  };

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
