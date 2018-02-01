import { premiumBlackPalette, shinbashiBluePalette } from './colors';

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
  },
};
