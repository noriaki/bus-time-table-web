const NextWorkboxWebpackPlugin = require('next-workbox-webpack-plugin');

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
          importScripts: ['sw.js'],
          importWorkboxFrom: 'cdn',
          offlineGoogleAnalytics: true,
          distDir,
          buildId,
          swDestRoot: `.next/static/${buildId}/pages`,
          swURLRoot: `_next/static/${buildId}/pages`,
        })
      );
    }
    return config;
  },
  generateBuildId: async () => {
    const { BUILD_ID } = process.env;
    if (BUILD_ID != null) { return BUILD_ID; }
    return null;
  },
  async rewrites() {
    return [
      { source: '/sw.bundle.js', destination: '/sw.js' },
    ];
  },
};
