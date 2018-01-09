import { premiumBlackPalette, shinbashiBluePalette } from './colors';

export default {
  fontFamily: "Roboto, 'Noto Sans Japanese', 'sans-serif'",
  palette: {
    primary: premiumBlackPalette,
    secondary: shinbashiBluePalette,
  },
  overrides: {
    MuiButton: {
      flatAccent: {
        color: shinbashiBluePalette['500'],
      },
    },
  },
};
