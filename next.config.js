// eslint-disable-next-line import/no-extraneous-dependencies
const { DefinePlugin } = require('webpack');
const { join } = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  webpack(config) {
    if (config.resolve.alias) {
      /* eslint-disable no-param-reassign */
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
      /* eslint-enable no-param-reassign */
    }

    // display git branch/revision
    const git = new GitRevisionPlugin();
    const branch = git.branch();
    const commit = git.commithash();
    config.plugins.push(
      new DefinePlugin({
        'process.env.GIT_BRANCH': JSON.stringify(branch),
        'process.env.GIT_COMMIT': JSON.stringify(commit),
      })
    );

    // precache by service worker
    config.plugins.push(
      new WorkboxPlugin({
        globDirectory: __dirname,
        globPatterns: ['static/**/*.{jpg,png,ico,css,json}'],
        swSrc: join(__dirname, 'libs', 'service-worker.js'),
        swDest: join(config.output.path, 'sw.js'),
      })
    );

    return config;
  },
};
