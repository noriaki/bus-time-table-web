module.exports = {
  parser: 'babel-eslint',
  root: true,
  env: {
    node: true,
    browser: true,
    serviceworker: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  plugins: ['react-hooks'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: { '~': './src/' },
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: { // edit as you like
    indent: ['error', 2],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-debugger': 'warn',
    'no-else-return': ['error', { allowElseIf: true }],
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-confusing-arrow': ['error', { allowParens: true }],
    'function-paren-newline': 'off',
    'react/jsx-closing-bracket-location': [ 'error', 'after-props' ],
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js', '.jsx']
    }],
    'react/prop-types': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'jsx-a11y/label-has-for': ['error', {
      components: ['label'],
      required: { some: ['id'] },
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
