const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');

const dev = process.env.NODE_ENV !== 'production';
const stg = process.env.NODE_ENV === 'staging';
const app = next({ dev });
const handle = app.getRequestHandler();

let env = 'dev';
let port = 3000;

if (!dev) {
  if (stg) {
    env = 'stg';
    port = 10001;
  }
  env = 'prod';
  port = 9001;
}

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
