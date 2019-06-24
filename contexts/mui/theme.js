import { createMuiTheme } from '@material-ui/core/styles';
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

export default theme;
