const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');

let dev = process.env.NODE_ENV !== 'production';
const stg = process.env.NODE_ENV === 'staging';

let env = 'dev';
let port = 3000;

if (!dev) {
  env = 'prod';
  port = 9001;
} else if (stg) {
  env = 'stg';
  port = 10001;
  dev = false;
  process.env.NODE_ENV = 'production'; // for JSS#createClassName
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const rootStaticFiles = [
        '/robots.txt',
        '/sitemap.xml',
      ];
      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        const path = join(__dirname, 'static', parsedUrl.pathname);
        app.serveStatic(req, res, path);
      } else if (isServiceWorkerFiles(parsedUrl.pathname)) {
        const path = join(__dirname, '.next', parsedUrl.pathname);
        app.serveStatic(req, res, path);
      } else {
        handle(req, res, parsedUrl);
      }
    })
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready [${env}] on http://localhost:${port}`);
      });
  });

const isServiceWorkerFiles = pathname => (
  pathname === '/sw.js' ||
    /\/workbox-sw\.prod\.v2\.1\.\d\.js(\.map)?$/.test(pathname)
);
