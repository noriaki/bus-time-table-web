import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import getContext from '../styles/getContext';

class DocumentContainer extends Document {
  render() {
    return (
      <html lang="ja">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no" />
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
DocumentContainer.getInitialProps = ({ renderPage }) => {
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

  return {
    ...page,
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
