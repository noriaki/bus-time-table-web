export const premiumBlack = '#0b1013' as const; // KUROTSURUBAMI
export const shinbashiBlue = '#0089a7' as const; // SHINBASHI
export const midori = '#227d51' as const; // MIDORI
export const akabeni = '#cb4042' as const; // AKABENI
export const silver = '#cacaca' as const;

export const premiumBlackPalette = {
  50: '#e2e2e3',
  100: '#b6b7b8',
  200: '#858889',
  300: '#54585a',
  400: '#303436',
  500: premiumBlack,
  600: '#0a0e11',
  700: '#080c0e',
  800: '#06090b',
  900: '#030506',
  A100: '#4dffff',
  A200: '#1affff',
  A400: '#00e6e6',
  A700: '#00cdcd',
  contrastText: '#fff',
  contrastDefaultColor: 'light',
} as const;

export const shinbashiBluePalette = {
  50: '#e0f1f4',
  100: '#b3dce5',
  200: '#80c4d3',
  300: '#4dacc1',
  400: '#269bb4',
  500: shinbashiBlue,
  600: '#00819f',
  700: '#007696',
  800: '#006c8c',
  900: '#00597c',
  A100: '#a9e3ff',
  A200: '#76d2ff',
  A400: '#43c1ff',
  A700: '#2ab9ff',
  contrastText: '#fff',
  contrastDefaultColor: 'light',
} as const;

export const midoriPalette = {
  light: '#56ad7d',
  main: midori,
  dark: '#005028',
  contrastText: '#fff',
} as const;

export const akabeniPalette = {
  light: '#ff726d',
  main: akabeni,
  dark: '#94001b',
  contrastText: '#fff',
} as const;
