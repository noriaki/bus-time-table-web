import { premiumBlackPalette, shinbashiBluePalette } from './colors';

export default {
  fontFamily: "Roboto, 'Noto Sans Japanese', 'sans-serif'",
  palette: {
    primary: {
      ...premiumBlackPalette,
      main: premiumBlackPalette[500],
    },
    secondary: {
      ...shinbashiBluePalette,
      main: shinbashiBluePalette[500],
    },
  },
  overrides: {
    MuiButton: {
      flatAccent: {
        color: shinbashiBluePalette['500'],
      },
    },
  },
};
