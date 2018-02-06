// eslint-disable-next-line import/no-extraneous-dependencies
const { DefinePlugin } = require('webpack');
const { join } = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const moment = require('moment');

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
    const cacheExpireSecondsShort = Math.floor(
      moment.utc(0).set({ dates: 7, hours: 24 }).valueOf() / 1000
    ); // 1-week
    const cacheExpireSecondsLong = Math.floor(
      moment.utc(0).set({ month: 1 }).valueOf() / 1000
    ); // 1-month
    const cacheExpireSecondsVeryLong = Math.floor(
      moment.utc(0).set({ months: 6 }).valueOf() / 1000
    ); // half-a-year
    config.plugins.push(
      new WorkboxPlugin({
        globDirectory: __dirname,
        globPatterns: ['static/**/*.{jpg,png,ico,css,json}'],
        globIgnores: [
          'node_modules/**/*',
          '*workbox-sw.prod.v2.1.2.js',
          '*sw.js',
        ],
        swDest: join(config.output.path, 'sw.js'),
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/fonts\.(?:googleapis|gstatic)\.com\/(.*)/,
            handler: 'cacheFirst',
            options: {
              cacheName: 'web-fonts',
              cacheExpiration: { maxAgeSeconds: cacheExpireSecondsVeryLong },
            },
          },
          {
            urlPattern: /^https?:\/\/[^/]+\/(timetable|info)?$/,
            handler: 'staleWhileRevalidate',
            options: {
              cacheName: 'pages',
              cacheExpiration: { maxAgeSeconds: cacheExpireSecondsShort },
            },
          },
          {
            urlPattern: /\/_next\/[0-9a-f-]+\/page\/(index|timetable|info)\.js/,
            handler: 'staleWhileRevalidate',
            options: {
              cacheName: 'page-scripts',
              cacheExpiration: { maxAgeSeconds: cacheExpireSecondsShort },
            },
          },
          {
            urlPattern: /\/_next\/[0-9a-f-]*\/[^/]*\.js$/,
            handler: 'staleWhileRevalidate',
            options: {
              cacheName: 'app-shell',
              cacheExpiration: { maxAgeSeconds: cacheExpireSecondsShort },
            },
          },
        ],
      })
    );

    return config;
  },
};
