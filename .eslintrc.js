module.exports = {
  root: true,
  extends: ['@cybozu/eslint-config/presets/react-typescript-prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '~': './src/',
        },
      },
    },
  },
  rules: {
    // edit as you like
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
  },
};
