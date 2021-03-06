const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const dayjs = require('dayjs');
const { execSync } = require('child_process');

// -- bump version
const args = process.argv.slice(2);
if (args.length === 1 && (/^(patch|minor|major)$/).test(args[0])) {
  execSync(`npm version ${args[0]} --no-git-tag-version`);
} else {
  console.error('Usage: node pre-release.js [major | minor | patch]');
  process.exit(1);
}

const now = dayjs().set({ second: 0, millisecond: 0 });

// -- update ld+json
const jsonldFilePath = resolve('src', 'data', 'jsonld.json');
const { version: nextVersion } = JSON.parse(readFileSync(resolve('package.json')));
const jsonldData = JSON.parse(readFileSync(jsonldFilePath));
const nextJsonldData = {
  ...jsonldData,
  version: nextVersion,
  softwareVersion: nextVersion,
  dateModified: now.format(),
};
writeFileSync(jsonldFilePath, JSON.stringify(nextJsonldData, null, 2));

// -- sitemap.xml
const sitemapFilePath = resolve('public', 'sitemap.xml');
let sitemap = readFileSync(sitemapFilePath).toString('utf8');
sitemap = sitemap
  .replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${now.format()}</lastmod>`);
writeFileSync(sitemapFilePath, `${sitemap}\n`);
