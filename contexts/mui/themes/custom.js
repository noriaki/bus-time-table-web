import { createMuiTheme } from 'material-ui/styles';
import { premiumBlackPalette, shinbashiBluePalette } from './colors';

const defaultTheme = createMuiTheme();

export default {
  fontFamily: "Roboto, 'Noto Sans Japanese', 'sans-serif'",
  palette: {
    primary: {
      main: premiumBlackPalette[500],
    },
    secondary: {
      main: shinbashiBluePalette[500],
    },
  },
  overrides: {
    MuiButton: {
      flatSecondary: {
        color: shinbashiBluePalette[500],
      },
    },
    MuiSnackbar: {
      root: {
        zIndex: defaultTheme.zIndex.appBar - 50,
      },
      anchorBottomCenter: {
        bottom: defaultTheme.mixins.toolbar.minHeight,
      },
    },
  },
};
