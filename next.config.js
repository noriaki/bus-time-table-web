// eslint-disable-next-line import/no-extraneous-dependencies
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

    let [branch, commit] = ['', ''];
    if (notProd) {
      const git = new GitRevisionPlugin();
      branch = git.branch();
      commit = git.commithash();
    }
    config.plugins.push(
      new DefinePlugin({
        'process.env.GIT_BRANCH': JSON.stringify(branch),
        'process.env.GIT_COMMIT': JSON.stringify(commit),
      })
    );

    return config;
  },
};
