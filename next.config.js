const NextWorkboxWebpackPlugin = require('next-workbox-webpack-plugin');
const { buildId: customBuildId } = require('./constants/build');

module.exports = {
  target: 'serverless',
  webpack: (config, {
    isServer,
    dev,
    buildId,
    config: { distDir },
  }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxWebpackPlugin({
          importScripts: ['static/sw.js'],
          importWorkboxFrom: 'cdn',
          offlineGoogleAnalytics: true,
          distDir,
          buildId,
          swDestRoot: `.next/static/${customBuildId}/pages`,
          swURLRoot: `_next/static/${customBuildId}/pages`,
        })
      );
    }
    return config;
  },
  generateBuildId: async () => customBuildId,
};
