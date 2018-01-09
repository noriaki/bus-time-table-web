import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import getContext from '../styles/getContext';

const withMaterialUI = (BaseComponent) => {
  class WithMaterialUI extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }
      return {};
    }

    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      const { theme, sheetsManager } = this.styleContext;
      return (
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <BaseComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  if (process.env.NODE_ENV === 'production') {
    WithMaterialUI.displayName =
      wrapDisplayName(BaseComponent, 'withMaterialUI');
  }

  return WithMaterialUI;
};

export default withMaterialUI;
