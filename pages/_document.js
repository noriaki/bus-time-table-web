import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import getContext from '../styles/getContext';

import { premiumBlack } from '../themes/colors';

class DocumentContainer extends Document {
  render() {
    const { baseURI } = this.props;
    return (
      <html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="バス時刻表" />
          <link rel="apple-touch-icon-precomposed" href="/static/icons/app.png" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={`${baseURI}/static/icons/app.png`} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="theme-color" content={premiumBlack} />
          <link rel="stylesheet" href="/static/normalize.css" />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/earlyaccess/notosansjp.css" />
          <link rel="stylesheet" href="/static/style.css" />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
DocumentContainer.getInitialProps = ({ renderPage, req }) => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context to collected side effects.
  const context = getContext();
  const page = renderPage(Component => props => (
    <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
      <Component {...props} />
    </JssProvider>
  ));

  const baseURI = req ? fqdn(req.headers) : fqdn(document.location);
  return {
    ...page,
    baseURI,
    stylesContext: context,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />
    ),
  };
};

export default DocumentContainer;

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;
