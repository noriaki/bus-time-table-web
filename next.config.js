const { DefinePlugin } = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

module.exports = {
  webpack(config) {
    const notProd = process.env.NODE_ENV !== 'production';

    if (config.resolve.alias) {
      /* eslint-disable no-param-reassign */
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
      /* eslint-enable no-param-reassign */
    }

    const branch = notProd ? new GitRevisionPlugin().branch() : '';
    config.plugins.push(
      new DefinePlugin({ BRANCH: JSON.stringify(branch) })
    );

    return config;
  },
};
