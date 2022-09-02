import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

import { withEmotionCache } from "./_app";

class MyDocument extends Document {
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

          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png" />

          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
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

export default withEmotionCache(MyDocument);
