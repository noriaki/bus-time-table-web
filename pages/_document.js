import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { rewind } from 'react-free-style';

const styles = rewind();

export default class extends Document {
  render() {
    return (
      <html lang="ja">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/static/normalize.css" />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/earlyaccess/notosansjp.css" />
          <link rel="stylesheet" href="/static/style.css" />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />
          {styles.toComponent()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
