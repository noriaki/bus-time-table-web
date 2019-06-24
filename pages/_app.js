import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import MuiContainer from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '~/contexts/mui/theme';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiContainer maxWidth="xs">
            <Component {...pageProps} />
          </MuiContainer>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
