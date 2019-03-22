import { SheetsRegistry } from 'jss';
import { createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/styles';
import { premiumBlackPalette, shinbashiBluePalette } from './themes/colors';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: premiumBlackPalette[300],
      main: premiumBlackPalette[500],
      dark: premiumBlackPalette[700],
      contrastText: premiumBlackPalette.contrastText,
    },
    secondary: {
      light: shinbashiBluePalette[300],
      main: shinbashiBluePalette[500],
      dark: shinbashiBluePalette[700],
      contrastText: shinbashiBluePalette.contrastText,
    },
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
