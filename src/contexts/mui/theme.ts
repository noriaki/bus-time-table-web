import { createMuiTheme } from '@material-ui/core/styles';
import {
  premiumBlackPalette,
  shinbashiBluePalette,
  midoriPalette,
  akabeniPalette,
} from './themes/colors';

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
    weekday: midoriPalette,
    holiday: akabeniPalette,
  },
});

export default theme;

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    weekday: Palette['primary'];
    holiday: Palette['primary'];
  }
  interface PaletteOptions {
    weekday: PaletteOptions['primary'];
    holiday: PaletteOptions['primary'];
  }
}
