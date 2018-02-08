/* eslint-disable no-restricted-globals */

// const swScriptPath = 'https://unpkg.com/workbox-sw@2.1.2';
const swScriptPath = 'https://unpkg.com/workbox-sw@2.1.2/build/importScripts/workbox-sw.prod.v2.1.2.js';

// const gaScriptPath = 'https://unpkg.com/workbox-google-analytics@2.1.1';
const gaScriptPath = 'https://unpkg.com/workbox-google-analytics@2.1.1/build/importScripts/workbox-google-analytics.prod.v2.1.1.js';

importScripts(swScriptPath, gaScriptPath);

const wb = new self.WorkboxSW({
  clientsClaim: true,
  skipWaiting: true,
});

importScripts(gaScriptPath);

const cacheExpireSecondsShort = 60 * 60 * 24 * 7; // 1-week
const cacheExpireSecondsLong = 60 * 60 * 24 * 30; // 1-month
const cacheExpireSecondsVeryLong = 60 * 60 * 24 * 30 * 6; // half-a-year

const regexpWebFonts = /^https?:\/\/fonts\.(?:googleapis|gstatic)\.com\/(.*)/;
wb.router.registerRoute(
  regexpWebFonts,
  wb.strategies.cacheFirst({
    cacheName: 'web-fonts',
    cacheExpiration: { maxAgeSeconds: cacheExpireSecondsVeryLong },
  }),
  'GET'
);

const regexpPages = /^https?:\/\/[^/]+\/(timetable|info)?$/;
wb.router.registerRoute(
  regexpPages,
  wb.strategies.staleWhileRevalidate({
    cacheName: 'pages',
    cacheExpiration: { maxAgeSeconds: cacheExpireSecondsShort },
  }),
  'GET'
);

const regexpPageScripts = /\/_next\/[0-9a-f-]+\/page\/(index|timetable|info)\.js/;
wb.router.registerRoute(
  regexpPageScripts,
  wb.strategies.staleWhileRevalidate({
    cacheName: 'page-scripts',
    cacheExpiration: { maxAgeSeconds: cacheExpireSecondsShort },
  }),
  'GET'
);

const regexpAppShell = /\/_next\/[0-9a-f-]*\/[^/]*\.js$/;
wb.router.registerRoute(
  regexpAppShell,
  wb.strategies.staleWhileRevalidate({
    cacheName: 'app-shell',
    cacheExpiration: { maxAgeSeconds: cacheExpireSecondsShort },
  }),
  'GET'
);

wb.precache([]);

self.workbox.googleAnalytics.initialize();

/* eslint-enable no-restricted-globals */
