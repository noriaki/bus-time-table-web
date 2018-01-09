const fs = require('fs');
const path = require('path');
const Xml2JsBuilder = require('xml2js').Builder;
const moment = require('moment');
const { execSync } = require('child_process');

const { paths } = require('../constants/pages');

// -- bump version
const args = process.argv.slice(2);
if (args.length === 1 && (/^(patch|minor|major)$/).test(args[0])) {
  execSync(`npm version ${args[0]} --no-git-tag-version`);
} else {
  console.error('Usage: node pre-release.js [major | minor | patch]');
  process.exit(1);
}

// -- update sitemap.xml
const baseUrl = 'https://deux-tours-bus.com';
const lastmod = moment().format();
const url = paths.map(pathname => ({
  loc: `${baseUrl}${pathname}`,
  lastmod,
  changefreq: 'weekly',
  priority: pathname === '/' ? '1.0' : '0.5',
}));

const xmlBuilder = new Xml2JsBuilder({ rootName: 'urlset' });
let xml = xmlBuilder.buildObject({ url });
xml = xml.replace(/<urlset>/, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

fs.writeFileSync(path.resolve('static', 'sitemap.xml'), `${xml}\n`);
