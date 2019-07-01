import React from 'react';
import App, { Container as NextContainer } from 'next/app';
import MuiContainer from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// material-ui theme
import theme from '~/contexts/mui/theme';

// containers
import Clock from '~/containers/ClockContainer';

// components
import JsonLd from '~/components/commons/JsonLd';

// data
import jsonLdData from '~/data/jsonld.json';

class ComDeuxToursBusApp extends App {
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
      <NextContainer>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiContainer maxWidth="xs">
            <Clock.Provider>
              <Component {...pageProps} />
            </Clock.Provider>
          </MuiContainer>
        </ThemeProvider>
        <JsonLd data={jsonLdData} />
      </NextContainer>
    );
  }
}

export default ComDeuxToursBusApp;
