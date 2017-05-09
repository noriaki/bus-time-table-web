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
        '/sw.js',
      ];
      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        const path = join(__dirname, 'static', parsedUrl.pathname);
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
